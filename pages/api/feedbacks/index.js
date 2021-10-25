import { protect, role } from "@/middlewares/auth";
import database from "@/middlewares/database";
import uploadFile from "@/middlewares/uploadFile";
import { ValidateProps } from "api-lib/constants";
import { ncOpts } from "api-lib/nc";
import { createFeedback, getFeedbacks } from "controllers/feedback";
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

handler.get(protect,role('admin'), getFeedbacks);
handler.post(protect, uploadFile.single("attachment"), createFeedback);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
