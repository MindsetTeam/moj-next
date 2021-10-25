import { protect, role } from "@/middlewares/auth";
import database from "@/middlewares/database";
import uploadFile from "@/middlewares/uploadFile";
import { ncOpts } from "api-lib/nc";
import { addAttachment, deleteAttachment } from "controllers/employee";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  protect,
  role("admin", "editor"),
  uploadFile.single("attachment"),
  addAttachment
);
handler.delete(
  protect,
  role("admin", "editor"),
  deleteAttachment
);

export default handler;
export const config = { api: { bodyParser: false } };
