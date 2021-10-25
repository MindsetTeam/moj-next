import Announcement from "@/models/Announcement";
import ErrorResponse from "@/utils/errorResponse";
import {
  deleteFileFromBucket,
  uploadFileToBucket,
} from "api-lib/storageBucket";

export const getAnnouncements = async (req, res, next) => {
  const reqQuery = {};
  if (req.user.role !== "admin") {
    reqQuery.isActive = true;
  }
  const announcements = await Announcement.find(reqQuery).sort("-createdAt");
  return res
    .status(200)
    .json({ success: true, data: announcements, msg: "Get Announcements" });
};

export const createAnnouncement = async (req, res, next) => {
  if (req.file) {
    const publicUrl = await uploadFileToBucket({
      fileName: req.file.filename,
      folderName: "announcement",
    });
    req.body.attachment = publicUrl;
  }
  const announcement = await Announcement.create({
    ...req.body,
    user: req.user.id,
  });
  return res
    .status(201)
    .json({ msg: "Created", success: true, data: announcement });
};

export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.query;
  console.log(req.query);
  if (!id) {
    throw new ErrorResponse("ID not found", 400);
  }
  const announcement = await Announcement.findByIdAndDelete(id);
  if (!announcement) {
    throw new ErrorResponse("Announcement not found", 404);
  }
  if (announcement.attachment) {
    deleteFileFromBucket(announcement.attachment);
  }
  res.status(200).json({ msg: "Deleted", success: true });
};

export const updateAnnouncement = async (req, res, next) => {
  const { id } = req.query;
  const announcement = await Announcement.findById(id);
  if (!announcement) {
    throw new ErrorResponse("Announcement not found", 404);
  }
  if (req.body.oldFileDeleted) {
    deleteFileFromBucket(announcement.attachment);
    req.body.attachment = null;
    delete req.body.oldFileDeleted;
  }
  if (req.file) {
    const publicUrl = await uploadFileToBucket({
      fileName: req.file.filename,
      folderName: "announcement",
    });
    req.body.attachment = publicUrl;
  }
  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res
    .status(200)
    .json({ msg: "Updated", success: true, data: updatedAnnouncement });
};
