import bcrypt from "bcryptjs";
import XLSX from "xlsx";
import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";

export const createUser = async (req, res, next) => {
  if (!req.body.nationalityIDNum) {
    throw new ErrorResponse("Please provide a nationality ID", 400);
  }

  // const password = await bcrypt.hash(req.body.nationalityIDNum, 10);
  let newUserData = {
    ...req.body,
    password: req.body.nationalityIDNum,
    addBy: req.user.id,
  };
  if (!["admin", "editor"].includes(req.user.role)) {
    newUserData = { ...newUserData, department: req.user.department };
  }

  const user = await User.create(newUserData);
  res
    .status(201)
    .json({ data: user, success: true, msg: "User created successfully" });
};

export const updateUsersCardID = async (req, res) => {
  // read from excel file
  const { file } = req;
  console.log(file);
  const workbook = XLSX.readFile(file.path);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  //update multiple mongoose documents
  const bulkOps = data.map((user) => ({
    updateOne: {
      filter: { nationalityIDNum: user.nationalityIDNum },
      update: { $set: { cardID: user.cardID } },
    },
  }));
  const results = await User.bulkWrite(bulkOps, { ordered: false });
  console.log("results", results);
  res
    .status(200)
    .json({
      success: true,
      msg: "Matched: " + results.nMatched + " Updated: " + results.nModified,
    });
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  console.log({ oldPassword, newPassword });
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  const isMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isMatched) {
    throw new ErrorResponse("Current password incorrect", 401);
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json({ success: true, msg: "Password updated" });
};
export const updatePasswordBelowLevel = async (req, res, next) => {
  const { newPassword } = req.body;
  const { id } = req.query;
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json({ success: true, msg: "Password updated" });
};
