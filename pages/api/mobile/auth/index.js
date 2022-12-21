import nc from "next-connect";
import database from "@/middlewares/database";
import { ncOpts } from "api-lib/nc";
import { compare } from "bcryptjs";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/utils/errorResponse";

const login = async (req, res, next) => {
  console.log('hiadfasd')
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      error: "Request missing username or password",
    });
  }
  const user = await User.findOne({
    nationalityIDNum: req.body.username,
  });

  if (!user) {
    throw new Error("No user found");
  }
  if (!user.approval || user.suspended) {
    throw new Error("Please ask for approval");
  }
  const isValid = await compare(req.body.password, user.password);

  if (!isValid) {
    throw new Error("Password not match");
  }
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, "secrettoken");
  return res.status(200).json({
    success: true,
    token,
    user
  });
};

const getMe = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if(req.cookies.token){
  //   token = req.cookies.token;
  // }
  if (!token) {
    throw new ErrorResponse("Not authorize to access this route", 401);
  }
  const decoded = jwt.verify(token, "secrettoken");
  console.log(decoded);
  const user = await User.findById(decoded.user.id);
  if (!user) {
    throw new ErrorResponse("User not found", 401);
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
};

const handler = nc(ncOpts);
handler.use(database);
handler.post(login);
handler.get(getMe);

export default handler;
