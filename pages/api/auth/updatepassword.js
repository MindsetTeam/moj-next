import nc from "next-connect";
import { updatePassword } from "controllers/users";
import { protect } from "@/middlewares/auth";
import { validateBody } from "api-lib/middlewares/ajv";
import { ValidateProps } from "api-lib/constants";
import database from "@/middlewares/database";
import { ncOpts } from "api-lib/nc";

const handler = nc(ncOpts);

handler.use(database);

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
  protect,
  updatePassword
);

export default handler;
