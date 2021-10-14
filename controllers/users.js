import bcrypt from "bcryptjs";
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
  if (req.user.role != "admin") {
    newUserData = { ...newUserData, department: req.user.department };
  }

  const user = await User.create(newUserData);
  res
    .status(201)
    .json({ data: user, success: true, msg: "User created successfully" });
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
  user.password = newPassword
  await user.save();
  return res
    .status(200)
    .json({ success: true, data: user, msg: "Password updated" });
};
