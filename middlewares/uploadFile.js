import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (file.fieldname === "img-profile") {
    //   return cb(null, "/tmp/img-profile");
    // }
    cb(null, process.env.uploadFilePath);
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "img-profile") {
      return cb(
        null,
        req.user.id + `-${nanoid(7)}` + path.parse(file.originalname).ext
      );
    }
    if (file.fieldname === "attachment") {
      return cb(
        null,
        path.parse(file.originalname).name +
          `-${nanoid(7)}` +
          path.parse(file.originalname).ext
      );
    }
  },
});

export default multer({ storage: storage, limits: { fileSize: 300000000 } });
