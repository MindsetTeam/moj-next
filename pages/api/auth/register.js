import all from "@/middlewares/all";
import { protect, role } from "@/middlewares/auth";
import { createUser } from "controllers/users";
import { notifyTelegramBot } from "controllers/telegrambot";

const handler = all;
handler.post(protect,notifyTelegramBot, role("admin", "editor"), createUser);
// handler.post(createUser);

export default handler;
