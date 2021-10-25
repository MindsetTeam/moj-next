import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    phoneNumber: String,
    description: String,
    attachment: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
