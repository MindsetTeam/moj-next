import nc from "next-connect";
import { protect, role } from "@/middlewares/auth";
const { default: all, errorHandle } = require("@/middlewares/all");

const { getOverviewEmployees } = require("controllers/employee");

const handler = nc(errorHandle);

handler.use(all);

handler.use(protect, role("admin", "editor"));
handler.get(getOverviewEmployees);

export default handler;
