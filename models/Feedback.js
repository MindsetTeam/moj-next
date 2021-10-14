import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  phoneNumber: String,
  description: String,
  images: [{ type: String }],
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
