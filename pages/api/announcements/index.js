import { protect, role } from "@/middlewares/auth";
import database from "@/middlewares/database";
import uploadFile from "@/middlewares/uploadFile";
import { ValidateProps } from "api-lib/constants";
import { ncOpts } from "api-lib/nc";
import { createAnnouncement, getAnnouncements } from "controllers/announcement";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

handler.get(protect, getAnnouncements);
handler.post(
  protect,
  role("admin", 'editor'),
  uploadFile.single("attachment"),
  createAnnouncement
);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
