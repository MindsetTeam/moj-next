import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (file.fieldname === "img-profile") {
    //   return cb(null, "/tmp/img-profile");
    // }
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "img-profile") {
      return cb(null, req.user.id + path.parse(file.originalname).ext);
    }

    return cb(null, req.user.id + path.parse(file.originalname).ext);
  },
});

export default multer({ storage: storage, limits: { fileSize: 300000000 } });
