import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "/moj-hr-39b0f2e19dd4.json",
  projectId: "moj-hr",
});
const storageBucket = storage.bucket("user_file_upload");
export default storageBucket;
