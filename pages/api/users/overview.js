import nc from "next-connect";
import { protect, role } from "@/middlewares/auth";
import { ncOpts } from "api-lib/nc";
import database from "@/middlewares/database";
// const { default: all, errorHandle } = require("@/middlewares/all");

const { getOverviewEmployees } = require("controllers/employee");

const handler = nc(ncOpts);
handler.use(database);

handler.use(protect, role("admin", "editor"));
handler.get(getOverviewEmployees);

export default handler;
