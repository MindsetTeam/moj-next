import errorHandler from "@/middlewares/errorHandler";
import noMatch from "./noMatch";

export const ncOpts = { onError: errorHandler, onNoMatch: noMatch };
