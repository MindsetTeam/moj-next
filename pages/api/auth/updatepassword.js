import nc from "next-connect";
import all from "@/middlewares/all";
import { updatePassword } from "controllers/users";
import ErrorResponse from "@/utils/errorResponse";
import { protect } from "@/middlewares/auth";
import { validateBody } from "api-lib/middlewares/ajv";
import { ValidateProps } from "api-lib/constants";
import database from "@/middlewares/database";

const handler = nc();

handler.use(database);

// handler.put(async (req, res, next) => {
//   // protect middleware
//   const { employeeId } = req.query;
//   if (!employeeId) throw new ErrorResponse("Please provided employee ID", 400);
//   req.user = { id: employeeId };
//   next();
// }, updatePassword);

// handler.put(protect, updatePassword);

const schemaUpdatePassword = {
  type: "object",
  properties: {
    oldPassword: ValidateProps.user.password,
    newPassword: ValidateProps.user.password,
  },
  required: ["oldPassword", "newPassword"],
  additionalProperties: false,
}

handler.put(
  validateBody(schemaUpdatePassword),
  updatePassword
);

export default handler;
