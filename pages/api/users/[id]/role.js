import nc from "next-connect";
import { updateRole } from "controllers/employee";
import { ncOpts } from "api-lib/nc";
import database from "@/middlewares/database";
import { protect, role } from "@/middlewares/auth";

const handler = nc(ncOpts);
handler.use(database);
handler.put(protect, role("admin", "editor"), updateRole);
export default handler;
