import all from "@/middlewares/all";
import { protect, role } from "@/middlewares/auth";
import { createUser } from "controllers/users";

const handler = all;
handler.post(protect, role("admin", "editor"), createUser);
// handler.post(createUser);

export default handler;
