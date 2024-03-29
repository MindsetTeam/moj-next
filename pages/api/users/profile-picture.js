// import { all } from "@/middlewares/index";
import User from "@/models/User";
import ErrorResponse from "@/utils/errorResponse";
import upload from "@/middlewares/uploadFile";
import database from "@/middlewares/database";

import nc from "next-connect";
// import { Storage } from "@google-cloud/storage";
import path from "path";
import storageBucket, { extractFileName } from "api-lib/storageBucket";
import { ncOpts } from "api-lib/nc";
import { protect } from "@/middlewares/auth";

const handler = nc(ncOpts);
handler.use(database);
handler.use(protect);

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
    const userUploadBucket = storageBucket;
    const user = await User.findById(req.user.id);
    if (user.photo !== "/noImg.jpg") {
      const oldFilename = extractFileName(user.photo);

      try {
        await userUploadBucket.file(oldFilename).delete();
      } catch (error) {}
    }
    // const userUploadBucket = storage.bucket("user_file_upload");
    const resUpload = await userUploadBucket.upload(
      path.join(process.env.uploadFilePath, req.file.filename),
      { destination: "img-profile/" + req.file.filename }
    );

    user.photo = (
      "https://storage.googleapis.com/users_upload_files/img-profile/" +
      req.file.filename
    ).toString();
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
