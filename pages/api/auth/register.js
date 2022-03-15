import all from "@/middlewares/all";
import nc from 'next-connect'
import { protect, role } from "@/middlewares/auth";
import { createUser } from "controllers/users";
import { notifyTelegramBot } from "controllers/telegrambot";
import { ncOpts } from "api-lib/nc";

const handler = nc(ncOpts);
handler.post(protect, notifyTelegramBot, role("admin", "editor"), createUser);

export default handler;
