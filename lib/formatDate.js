import moment from "moment";
import "moment/locale/km";

export const formalKhmerDate = (date) =>
  date ? moment(date).locale('km').format("DD/MM/YYYY") : "";
