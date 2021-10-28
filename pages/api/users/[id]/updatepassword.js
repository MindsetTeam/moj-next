import nc from "next-connect";
import { updatePasswordBelowLevel } from "controllers/users";
import { protect, role } from "@/middlewares/auth";
import { validateBody } from "api-lib/middlewares/ajv";
import { ValidateProps } from "api-lib/constants";
import database from "@/middlewares/database";
import { ncOpts } from "api-lib/nc";

const handler = nc(ncOpts);

handler.use(database);

const schemaUpdatePassword = {
  type: "object",
  properties: {
    newPassword: ValidateProps.user.password,
  },
  required: ["newPassword"],
  additionalProperties: false,
};

handler.put(
  protect,
  validateBody(schemaUpdatePassword),
  role("admin", "editor"),
  updatePasswordBelowLevel
);

export default handler;
