import Announcement from "@/models/Announcement";

export const getAnnouncements = async (req, res, next) => {
  const announcements = await Announcement.find().sort("-createdAt");
  return res
    .status(200)
    .json({ success: true, data: announcements, msg: "Get Announcements" });
};

export const createAnnouncement = async (req, res, next) => {
  console.log({file: req.file, body: req.body})
  // const createdAnnouncement = await Announcement.create(req.body);
  res.status(200).json({test:false})
};

export const deleteAnnouncement = (req, res, next) => {};

export const updateAnnouncement = (req, res, next) => {};
