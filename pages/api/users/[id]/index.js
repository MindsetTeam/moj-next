import nc from "next-connect";
import { getSession } from "next-auth/client";
import { errorHandle } from "@/middlewares/all";
import { all } from "@/middlewares/index";
import {
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  updateRole,
} from "controllers/employee";
import ErrorResponse from "@/utils/errorResponse";
import User from "@/models/User";
import { protect, role } from "@/middlewares/auth";
import { ncOpts } from "api-lib/nc";
import database from "@/middlewares/database";
import { notifyTelegramBot } from "controllers/telegrambot";

// const handler = nc({...errorHandle, attachParams: true});

// handler.use(all);

const handler = nc(ncOpts);
handler.use(database);
handler.use(protect);
handler.use(notifyTelegramBot)
handler.get(getSingleEmployee);
handler.use(role("admin", "editor"));
handler.put(updateEmployee);
handler.delete(deleteEmployee);

export default handler;
