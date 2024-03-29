import { protect, role } from "@/middlewares/auth";
import database from "@/middlewares/database";
// import errorHandler from "@/middlewares/errorHandler";
import { ncOpts } from "api-lib/nc";
import nc from "next-connect";
// const { default: all } = require("@/middlewares/all");
import { notifyTelegramBot } from "controllers/telegrambot";

const { getEmployees } = require("controllers/employee");

const handler = nc(ncOpts);
handler.use(database);

handler.get(protect,notifyTelegramBot, role("admin", "editor", "moderator"), getEmployees);

export default handler;