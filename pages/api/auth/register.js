import all from "@/middlewares/all";
import { protect } from "@/middlewares/auth";
import { createUser } from "controllers/users";

const handler = all;
handler.post(protect, createUser);
// handler.post(createUser);

export default handler;
