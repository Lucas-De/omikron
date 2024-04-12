import { format } from "date-fns";

export const isoFormat = (date: Date) => format(date, "yyyy-MM-dd");
export const i18nFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
}).format;
