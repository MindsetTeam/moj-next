import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";
export const getOverviewEmployees = async (req, res) => {
  const { role } = req.user;
  let resData = {};
  if (role === "editor") {
    const users = await User.aggregate([
      { $match: { department: req.user.department } },
      { $group: { _id: "$gender", total: { $sum: 1 } } },
    ]);
    resData = users.reduce(
      (pre, cur) => {
        pre["total"] = pre.total + (cur["_id"] != null ? cur.total : 0);
        pre[cur["_id"]] = +cur["total"];
        return pre;
      },
      { total: 0, ស្រី: 0, ប្រុស: 0 }
    );
  }
  if (role === "admin") {
    const provinceInstitutionRawData = await User.aggregate([
      {
        $project: {
          gender: 1,
          approval: 1,
          experience: { $slice: ["$experience", -1] },
        },
      },
      {
        $match: { "experience.institution": "ថ្នាក់ក្រោមជាតិ", approval: true },
      },
      {
        $group: {
          _id: "$gender",
          total: { $sum: 1 },
        },
      },
    ]);
    const centerInstitutionRawData = await User.aggregate([
      {
        $project: {
          gender: 1,
          approval: 1,
          experience: { $slice: ["$experience", -1] },
        },
      },
      { $match: { "experience.institution": "ថ្នាក់កណ្តាល", approval: true } },
      {
        $group: {
          _id: "$gender",
          total: { $sum: 1 },
        },
      },
    ]);
    const centerInstitution = {
      ប្រុស: 0,
      ស្រី: 0,
    };

    const provinceInstitution = { ...centerInstitution };
    centerInstitutionRawData.forEach((v) => {
      centerInstitution[v._id] = v.total;
    });
    provinceInstitutionRawData.forEach((v) => {
      provinceInstitution[v._id] = v.total;
    });
    console.log({ provinceInstitution, centerInstitution });
    resData = { centerInstitution, provinceInstitution };
  }
  res.status(200).json({
    success: true,
    msg: "Employees overview",
    data: resData,
  });
};
export const getEmployees = async (req, res) => {
  const { searchTerm } = req.query;
  let reqQuery;
  if (searchTerm) {
    let searchReg = new RegExp(searchTerm, "i");
    reqQuery = {
      $or: [
        // { civilID: searchReg },
        { nationalityIDNum: searchReg },
        { firstName: searchReg },
        { lastName: searchReg },
      ],
    };
  }
  if (req.user.role !== "admin") {
    reqQuery = { ...req.query, department: req.user.department };
  }
  const users = await User.find(reqQuery);

  res.status(200).json({
    success: true,
    msg: searchTerm ? `User with ${searchTerm}` : "Find all user",
    data: users,
  });
};

export const getSingleEmployee = async (req, res, next) => {
  const { id } = req.query;
  if (!id) throw new ErrorResponse("Please provided employee ID", 400);
  const user = await User.findById(id);
  console.log(user);
  res.status(200).json(user);
};

export const updateEmployee = async (req, res, next) => {
  const { id } = req.query;
  const dataUpdate = req.body;
  if (!id) throw new ErrorResponse("Please provided employee ID", 400);
  const user = await User.findByIdAndUpdate(id, dataUpdate, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, data: user, msg: "User updated successfully" });
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.query;
  const resData = await User.findByIdAndDelete(id);
  console.log(resData);
  res
    .status(200)
    .json({ success: true, data: {}, msg: "User deleted successfully" });
};

export const updateRole = async (req, res, next) => {
  const { id } = req.query;
  const { role } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  user.role = role;
  await user.save();
  res
    .status(200)
    .json({ success: true, msg: "Role updated successfully", data: user });
};
