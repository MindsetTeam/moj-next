import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
  // keyFilename: "/moj-hr-39b0f2e19dd4.json",
  //local only
  keyFilename: "moj-hr-39b0f2e19dd4.json",
  projectId: "moj-hr",
});
const storageBucket = storage.bucket("users_upload_files");

export const uploadFileToBucket = async ({ fileName, folderName }) => {
  const fileDestination = folderName + "/" + fileName;
  await storageBucket.upload(path.join(process.env.uploadFilePath, fileName), {
    destination: fileDestination,
  });
  return getPublicUrl(fileDestination);
};

export const deleteFileFromBucket = async (publicUrl) => {
  const filename = extractFileName(publicUrl);
  if (filename) {
    await storageBucket.file(filename).delete();
  }
};

export const extractFileName = (path) => {
  return path.split("users_upload_files/")[1];
};

export const getPublicUrl = (path) =>
  `https://storage.googleapis.com/users_upload_files/${path}`;

export default storageBucket;
