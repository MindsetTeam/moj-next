import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  files: [
    {
      type: String,
    },
  ],
});

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
