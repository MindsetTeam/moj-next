import Feedback from "@/models/Feedback";
import {
  uploadFileToBucket,
} from "api-lib/storageBucket";

export const getFeedbacks = async (req, res, next) => {
  const feedbacks = await Feedback.find({})
    .sort("-createdAt")
    .populate({ path: "user", select: "firstName lastName" });
  return res
    .status(200)
    .json({ success: true, data: feedbacks, msg: "Get feedbacks" });
};

export const createFeedback = async (req, res, next) => {
  if (req.file) {
    const publicUrl = await uploadFileToBucket({
      fileName: req.file.filename,
      folderName: "feedback",
    });
    req.body.attachment = publicUrl;
  }
  const feedback = await Feedback.create({
    ...req.body,
    user: req.user.id,
  });
  return res
    .status(201)
    .json({ msg: "Created", success: true, data: feedback });
};
