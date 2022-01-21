import nc from "next-connect";
import { ncOpts } from "api-lib/nc";
import database from "@/middlewares/database";
import { protect, role } from "@/middlewares/auth";
import { updateUsersCardID } from "controllers/users";
import uploadFile from "@/middlewares/uploadFile";

const handler = nc(ncOpts);
handler.use(database);

handler.post(
  protect,
  role("admin", "editor"),
  uploadFile.single("card-xlsx"),
  updateUsersCardID
);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
