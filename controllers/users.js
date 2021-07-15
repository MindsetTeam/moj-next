import bcrypt from "bcryptjs";
import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";

export const createUser = async (req, res, next) => {
  if (!req.body.nationalityIDNum) {
    throw new ErrorResponse("Please provide a nationality ID", 400);
  }
  if (req.body.role) {
    delete req.body.role;
  }
  const password = await bcrypt.hash(req.body.nationalityIDNum, 10);
  const user = await User.create({
    ...req.body,
    password,
    addBy: req.user.id,
  });
  res
    .status(201)
    .json({ data: user, success: true, msg: "User created successfully" });
};

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.status(200).json({ success: true, data: user, msg: "Password updated" });
};
