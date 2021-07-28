import { all } from "@/middlewares/index";
import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";
import upload from "@/middlewares/uploadFile";
import nc from "next-connect";
import { Storage } from "@google-cloud/storage";
import path from "path";
const handler = nc();

const storage = new Storage({
  keyFilename: "moj-hr-39b0f2e19dd4.json.example",
  // keyFilename: "moj-hr-39b0f2e19dd4.json",
  projectId: "moj-hr",
});

handler.use(all);

handler.post(
  async (req, res, next) => {
    // protect middleware
    const { employeeId } = req.query;
    if (!employeeId)
      throw new ErrorResponse("Please provided employee ID", 400);
    req.user = { id: employeeId };
    next();
  },
  upload.single("img-profile"),
  async (req, res, next) => {
    if (!req.file) {
      throw new ErrorResponse("Image not found", 400);
    }
    const userUploadBucket = storage.bucket("user_file_upload");
    const resUpload = await userUploadBucket.upload(
      path.join('/tmp', req.file.filename),
      { destination: "img-profile/" + req.file.filename }
    );
    console.log(resUpload);

    const user = await User.findById(req.user.id);
    user.photo = ('https://storage.googleapis.com/user_file_upload/img-profile/' + req.file.filename).toString();
    await user.save();
    res.status(200).json({ success: true, data: { user } });
  }
);

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
