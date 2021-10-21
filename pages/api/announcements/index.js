import { protect } from "@/middlewares/auth";
import database from "@/middlewares/database";
import uploadFile from "@/middlewares/uploadFile";
import { ValidateProps } from "api-lib/constants";
import { ncOpts } from "api-lib/nc";
import { createAnnouncement, getAnnouncements } from "controllers/announcement";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

// const schemaAnnouncement ={
//   type: 'object',
//   properties: {
//     phoneNumber: ValidateProps.user.phoneNumber,
//     description: ValidateProps.announcement.description,
//     attachment: ValidateProps.file.path
//   },k
//   required: ['phoneNumber', 'description'],
// }

handler.get(protect, getAnnouncements);
handler.post(protect, uploadFile.single("attachment"), createAnnouncement);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
