import Feedback from "@/models/Feedback";

export const getFeedbacks = async (req, res, next) => {
  const feedbacks = await Feedback.find().sort("-createdAt");
  return res
    .status(200)
    .json({ success: true, data: feedbacks, msg: "Get feedbacks" });
};

export const createFeedback = async (req, res, next) => {
  const createdFeedback = await Feedback.create(req.body);
};

export const deleteFeedback = (req, res, next) => {};

export const updateFeedback = (req, res, next) => {};


