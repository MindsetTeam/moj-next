import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";
import {
  deleteFileFromBucket,
  uploadFileToBucket,
} from "api-lib/storageBucket";

export const getOverviewEmployees = async (req, res) => {
  const { role, latestOfficerStatus, moderatorType } = req.user;
  let resData = {};
  let retiredEmployeeReq,
    officerStatusListReq,
    centerInstitutionRawDataReq,
    totalEmployeeReq,
    generalDepartmentResReq = "";

  // if (role === "editor") {
  //   const users = await User.aggregate([
  //     { $match: { department: req.user.department } },
  //     { $group: { _id: "$gender", total: { $sum: 1 } } },
  //   ]);
  //   resData = users.reduce(
  //     (pre, cur) => {
  //       pre["total"] = pre.total + (cur["_id"] != null ? cur.total : 0);
  //       pre[cur["_id"]] = +cur["total"];
  //       return pre;
  //     },
  //     { total: 0, ស្រី: 0, ប្រុស: 0 }
  //   );
  // }
  if (["admin", "editor"].includes(role)) {
    const overviewQuery = {
      approval: true,
      "latestOfficerStatus.rank": { $ne: "និវត្តន៍" },
    };
    // const retiredEmployeeReq = User.find({
    //   approval: true,
    //   birthDate: { $lt: new Date(Date.now() - 60 * 365 * 24 * 60 * 60 * 1000) },
    // }).countDocuments();
    retiredEmployeeReq = User.aggregate([
      {
        $match: {
          approval: true,
          // officerStatus: { $elemMatch: { rank: "និវត្តន៍" } },
          "latestOfficerStatus.rank": "និវត្តន៍",
        },
      },
      {
        $count: "total",
      },
    ]);
    officerStatusListReq = User.aggregate([
      // {
      //   $project: {
      //     approval: 1,
      //     officerStatus: { $slice: ["$officerStatus", -1] },
      //   },
      // },
      {
        $match: overviewQuery,
      },
      {
        $group: {
          _id: "$latestOfficerStatus.rank",
          total: { $sum: 1 },
        },
      },
    ]);
    centerInstitutionRawDataReq = User.aggregate([
      { $match: overviewQuery },
      {
        $group: {
          _id: "$gender",
          total: { $sum: 1 },
        },
      },
    ]);
    totalEmployeeReq = User.countDocuments(overviewQuery);
    generalDepartmentResReq = User.aggregate([
      // {
      //   $project: {
      //     approval: 1,
      //     officerStatus: { $slice: ["$officerStatus", -1] },
      //   },
      // },
      {
        $match: overviewQuery,
      },
      {
        $group: {
          _id: "$latestOfficerStatus.unit",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);
  }
  if (
    role == "moderator" &&
    moderatorType != "" &&
    latestOfficerStatus.unit !== ""
  ) {
    let queryModerator = {};
    const { user } = req;
    // user;
    queryModerator["latestOfficerStatus.unit"] =
      req.user.latestOfficerStatus.unit;
    if (["generalDepartment", "department"].includes(req.user.moderatorType)) {
      queryModerator["latestOfficerStatus.generalDepartment"] =
        req.user.latestOfficerStatus.generalDepartment;
    }
    if (req.user.moderatorType === "department") {
      queryModerator["latestOfficerStatus.department"] =
        req.user.latestOfficerStatus.department;
    }
    retiredEmployeeReq = User.aggregate([
      {
        $match: {
          approval: true,
          officerStatus: { $elemMatch: { rank: "និវត្តន៍" } },
          ...queryModerator,
        },
      },
      {
        $count: "total",
      },
    ]);
    officerStatusListReq = User.aggregate([
      {
        $project: {
          approval: 1,
          latestOfficerStatus: 1,
          // officerStatus: { $slice: ["$officerStatus", -1] },
        },
      },
      {
        $match: {
          approval: true,
          // officerStatus: { $elemMatch: { $exists: true } },
          ...queryModerator,
        },
      },
      {
        $group: {
          _id: "$latestOfficerStatus.rank",
          total: { $sum: 1 },
        },
      },
    ]);
    centerInstitutionRawDataReq = User.aggregate([
      { $match: { approval: true, ...queryModerator } },
      {
        $group: {
          _id: "$gender",
          total: { $sum: 1 },
        },
      },
    ]);
    totalEmployeeReq = User.countDocuments({
      approval: true,
      ...queryModerator,
    });
    generalDepartmentResReq = User.aggregate([
      {
        $project: {
          approval: 1,
          latestOfficerStatus: 1,
          // officerStatus: { $slice: ["$officerStatus", -1] },
        },
      },
      {
        $match: {
          approval: true,
          // officerStatus: { $elemMatch: { $exists: true } },
          ...queryModerator,
        },
      },
      {
        $group: {
          _id: "$latestOfficerStatus.department",
          total: { $sum: 1 },
        },
      },
    ]);
  }
  // const generalDepartmentResReq = User.aggregate([
  //   { $match: { approval: true } },
  //   {
  //     $group: {
  //       _id: "$generalDepartment",
  //       total: { $sum: 1 },
  //     },
  //   },
  // ]);
  const [
    retiredEmployee,
    officerStatusListRes,
    centerInstitutionRawData,
    totalEmployee,
    generalDepartmentRes,
  ] = await Promise.all([
    retiredEmployeeReq,
    officerStatusListReq,
    centerInstitutionRawDataReq,
    totalEmployeeReq,
    generalDepartmentResReq,
  ]);

  // const retiredEmployee = await
  // const officerStatusListRes = await
  const officerStatusList = {};
  officerStatusListRes.forEach((v) => {
    officerStatusList[v._id] = v.total;
  });
  //

  // const provinceInstitutionRawData = await User.aggregate([
  //   {
  //     $project: {
  //       gender: 1,
  //       approval: 1,
  //       experience: { $slice: ["$experience", -1] },
  //     },
  //   },
  //   {
  //     $match: { "experience.institution": "ថ្នាក់ក្រោមជាតិ", approval: true },
  //   },
  //   {
  //     $group: {
  //       _id: "$gender",
  //       total: { $sum: 1 },
  //     },
  //   },
  // ]);
  // const centerInstitutionRawData = await
  // const centerInstitutionRawData = await User.aggregate([
  //   {
  //     $project: {
  //       gender: 1,
  //       approval: 1,
  //       experience: { $slice: ["$experience", -1] },
  //     },
  //   },
  //   { $match: { "experience.institution": "ថ្នាក់កណ្តាល", approval: true } },
  //   {
  //     $group: {
  //       _id: "$gender",
  //       total: { $sum: 1 },
  //     },
  //   },
  // ]);
  const centerInstitution = {
    ប្រុស: 0,
    ស្រី: 0,
    total: 0,
  };

  // const totalEmployee = await User.countDocuments({ approval: true });
  // const generalDepartmentRes = await User.aggregate([
  //   { $match: { approval: true } },
  //   {
  //     $group: {
  //       _id: "$generalDepartment",
  //       total: { $sum: 1 },
  //     },
  //   },
  // ]);
  const generalDepartmentList = {};
  generalDepartmentRes.forEach((v) => {
    generalDepartmentList[v._id] = v.total;
  });

  // const provinceInstitution = { ...centerInstitution };
  centerInstitutionRawData.forEach((v) => {
    centerInstitution[v._id] = v.total;
    centerInstitution.total += v.total;
  });
  // provinceInstitutionRawData.forEach((v) => {
  //   provinceInstitution[v._id] = v.total;
  //   provinceInstitution.total += v.total;
  // });
  //
  resData = {
    totalEmployee,
    generalDepartmentList,
    centerInstitution,
    // provinceInstitution,
    retiredEmployee: retiredEmployee.length > 0 ? retiredEmployee[0].total : 0,
    officerStatusList,
  };
  console.log(resData);
  res.status(200).json({
    success: true,
    msg: "Employees overview",
    data: resData,
  });
};

export const getEmployees = async (req, res) => {
  const {
    searchTerm,
    select,
    retired,
    nearRetired,
    unit,
    office,
    generalDepartment,
    department,
    rank,
    page,
    size,
  } = req.query;
  let reqQuery;
  if (searchTerm) {
    let searchReg = new RegExp(searchTerm, "i");
    reqQuery = {
      $or: [
        { nationalityIDNum: searchReg },
        { firstName: searchReg },
        { lastName: searchReg },
        { firstNameLatin: searchReg },
        { lastNameLatin: searchReg },
        // { officerID: searchReg },
        // { civilID: searchReg },
      ],
    };
  }
  // if (!["admin", "editor"].includes(req.user.role)) {
  //   reqQuery = { ...reqQuery, department: req.user.department };
  // }
  if (retired) {
    reqQuery = {
      // latestOfficerStatus: { $elemMatch: { rank: "និវត្តន៍" } },
      "latestOfficerStatus.rank": "និវត្តន៍",
      ...reqQuery,
    };
  }
  if (nearRetired) {
    if (retired) {
      delete reqQuery["latestOfficerStatus.rank"];
      reqQuery = {
        $or: [
          {
            birthDate: {
              $lt: new Date(Date.now() - 59.5 * 365 * 24 * 60 * 60 * 1000),
            },
          },
          // "latestOfficerStatus.rank": { $ne: "និវត្តន៍" },
          { "latestOfficerStatus.rank": "និវត្តន៍" },
        ],
        ...reqQuery,
      };
    } else {
      reqQuery = {
        birthDate: {
          $lt: new Date(Date.now() - 59.5 * 365 * 24 * 60 * 60 * 1000),
        },
        // "latestOfficerStatus.rank": { $ne: "និវត្តន៍" },
        // "latestOfficerStatus.rank": { $ne: "និវត្តន៍" },
        ...reqQuery,
      };
    }
  }

  if (rank) {
    reqQuery = {
      "latestOfficerStatus.rank": rank,
      ...reqQuery,
    };
  }
  if (["admin", "editor"].includes(req.user.role) && unit) {
    reqQuery = {
      "latestOfficerStatus.unit": unit,
      ...reqQuery,
    };
    if (generalDepartment) {
      reqQuery = {
        "latestOfficerStatus.generalDepartment": generalDepartment,
        ...reqQuery,
      };
    }
    if (department) {
      reqQuery = {
        "latestOfficerStatus.department": department,
        ...reqQuery,
      };
    }
    if (office) {
      reqQuery = {
        "latestOfficerStatus.office": office,
        ...reqQuery,
      };
    }
  }
  if (req.user.role === "moderator") {
    if (generalDepartment) {
      reqQuery = {
        "latestOfficerStatus.generalDepartment": generalDepartment,
        ...reqQuery,
      };
    }
    if (department) {
      reqQuery = {
        "latestOfficerStatus.department": department,
        ...reqQuery,
      };
    }
    if (office) {
      reqQuery = {
        "latestOfficerStatus.office": office,
        ...reqQuery,
      };
    }
    let queryModerator = {};
    queryModerator["latestOfficerStatus.unit"] =
      req.user.latestOfficerStatus.unit;
    if (["generalDepartment", "department"].includes(req.user.moderatorType)) {
      queryModerator["latestOfficerStatus.generalDepartment"] =
        req.user.latestOfficerStatus.generalDepartment;
    }
    if (req.user.moderatorType === "department") {
      queryModerator["latestOfficerStatus.department"] =
        req.user.latestOfficerStatus.department;
    }
    reqQuery = {
      ...reqQuery,
      ...queryModerator,
    };
  }

  let searchQuery = User.find(reqQuery).sort("-createdAt");
  if (select) {
    searchQuery = searchQuery.select(select.split(",").join(" "));
  }

  // if (req.user.role === "moderator") {
  //   const userModerator = await User.findById(req.user.id);
  //   const statusModerator =
  //     userModerator.officerStatus[userModerator.officerStatus.length - 1];
  //   let matchQueryMo;
  //   if (userModerator.moderatorType === "generalDepartment") {
  //     matchQueryMo = {
  //       $elemMatch: {
  //         generalDepartment: statusModerator.generalDepartment,
  //       },
  //     };
  //   } else {
  //     matchQueryMo = {
  //       $elemMatch: {
  //         department: statusModerator.department,
  //       },
  //     };
  //   }
  //   searchQuery = User.aggregate([
  //     {
  //       $project: {
  //         firstName: 1,
  //         lastName: 1,
  //         nationalityIDNum: 1,
  //         gender: 1,
  //         birthDate: 1,
  //         rank: 1,
  //         role: 1,
  //         suspended: 1,
  //         approval: 1,
  //         createdAt: 1,
  //         officerStatus: { $slice: ["$officerStatus", -1] },
  //       },
  //     },
  //     {
  //       $match: {
  //         approval: true,
  //         officerStatus: { ...matchQueryMo },
  //         ...reqQuery,
  //         // officerStatus: { $elemMatch: { $exists: true } },
  //       },
  //     },
  //     { $sort: { createdAt: -1 } },
  //   ]);
  // }

  const totalUser = await User.countDocuments(reqQuery);
  const pageSize = +size || 10;
  const currentPage = +page || 1;
  const skip = (currentPage - 1) * pageSize;
  if (["remove-pagination"].includes(req.query)) {
    searchQuery.skip(skip).limit(pageSize);
  }

  const users = await searchQuery;
  res.status(200).json({
    success: true,
    msg: searchTerm ? `User with ${searchTerm}` : "Find all user",
    data: users,
    total: totalUser,
  });
};

export const getSingleEmployee = async (req, res, next) => {
  const { id } = req.query;
  const { user } = req;
  if (!id) throw new ErrorResponse("Please provided employee ID", 400);
  if (user.id !== id && user.role == "user")
    throw new ErrorResponse("You are not authorized to access this user", 400);
  const resUser = await User.findById(id);
  if (!resUser) throw new ErrorResponse("User not found", 400);
  if (user.role == "moderator") {
    const compareObj = {};
    let isAllow = false;
    if (user.moderatorType && resUser.latestOfficerStatus) {
      if (
        ["unit", "generalDepartment", "department"].includes(user.moderatorType)
      ) {
        compareObj.generalDepartment =
          user.latestOfficerStatus.generalDepartment;
      }
      if (["generalDepartment", "department"].includes(user.moderatorType)) {
        compareObj.department = user.latestOfficerStatus.department;
      }
      if (user.moderatorType == "department") {
        compareObj.office = user.latestOfficerStatus.office;
      }

      isAllow = Object.keys(compareObj).every((current) => {
        return (
          resUser.latestOfficerStatus[current] ==
          user.latestOfficerStatus[current]
        );
      });
    }
    if (!user.moderatorType || !isAllow) {
      throw new ErrorResponse(
        "You are not authorized to access this user",
        400
      );
    }
  }
  // console.log(user)
  // if (user.experience) {
  //   user.experience = user.experience.sort(
  //     (a, b) =>
  //       new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  //   );
  //
  // }
  res.status(200).json(resUser);
};

export const updateEmployee = async (req, res, next) => {
  const { id } = req.query;
  const dataUpdate = req.body;
  delete dataUpdate.role;
  delete dataUpdate.moderatorType;
  if (!id) throw new ErrorResponse("Please provided employee ID", 400);
  if (dataUpdate.currentResidence) {
    dataUpdate.partnerInfo = {
      currentResidence: { ...dataUpdate.currentResidence },
    };
  }

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

  res
    .status(200)
    .json({ success: true, data: {}, msg: "User deleted successfully" });
};

export const updateRole = async (req, res, next) => {
  const { id } = req.query;
  const { role, moderatorType } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  user.role = role;
  user.moderatorType = moderatorType;
  await user.save();
  res
    .status(200)
    .json({ success: true, msg: "Role updated successfully", data: user });
};

export const addAttachment = async (req, res, next) => {
  const { id } = req.query;
  const { description, type } = req.query;
  if (!req.file) {
    throw new ErrorResponse("Missing attachment", 400);
  }
  const publicUrl = await uploadFileToBucket({
    fileName: req.file.filename,
    folderName: "user-attachment/" + id,
  });
  const attachmentType = "attachment." + type;
  const user = await User.findById(id);
  const existedFile = user.attachment[type].findIndex(
    (v) => v.description == description
  );
  if (existedFile >= 0) {
    deleteFileFromBucket(user.attachment[type][existedFile].url);
    user.attachment[type][existedFile].url = publicUrl;
    //
  } else {
    user.attachment[type].push({
      description,
      url: publicUrl,
    });
  }
  await user.save({ validateBeforeSave: false });
  // const user = await User.findByIdAndUpdate(
  //   id,
  //   {
  //     $push: { [attachmentType]: { description, url: publicUrl } },
  //   }
  //   // { new: true }
  // );

  //

  res.status(200).json({
    success: true,
    msg: "Successfully added",
    url: publicUrl,

    data: {
      id: user.id,
      attachment: user.attachment,
    },
  });
};

export const deleteAttachment = async (req, res, next) => {
  const { id, attachmentId, type } = req.query;
  const searchPath = `attachment.${type}._id`;
  const user = await User.findOne({
    [searchPath]: attachmentId,
    _id: id,
  }).select("attachment");
  if (!user) {
    throw new ErrorResponse("File not found", 404);
  }
  const indexDeleteFile = user.attachment[type].findIndex(
    (v) => v._id == attachmentId
  );
  if (indexDeleteFile >= 0) {
    deleteFileFromBucket(user.attachment[type][indexDeleteFile].url);
  }
  user.attachment[type].pull({ _id: attachmentId });
  await user.save();
  res.status(200).json({ msg: "Deleted", success: true, data: user });
};
