import { protect, role } from "@/middlewares/auth";
import database from "@/middlewares/database";
import uploadFile from "@/middlewares/uploadFile";
import { ncOpts } from "api-lib/nc";
import {
  deleteAnnouncement,
  updateAnnouncement,
} from "controllers/announcement";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

// const schemaFeedback ={
//   type: 'object',
//   properties: {
//     phoneNumber: ValidateProps.user.phoneNumber,
//     description: ValidateProps.feedback.description,
//     attachment: ValidateProps.file.path
//   },
//   required: ['phoneNumber', 'description'],
// }

handler.delete(protect, role("admin", "editor"), deleteAnnouncement);
handler.put(
  protect,
  role("admin", "editor"),
  uploadFile.single("attachment"),
  updateAnnouncement
);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
