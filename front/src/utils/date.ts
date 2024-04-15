import { format, parseISO } from "date-fns";

export const isoFormat = (utcDateString: string) =>
  format(parseISO(utcDateString), "yyyy-MM-dd");

export const i18nFormat = (utcDateString: string) =>
  format(parseISO(utcDateString), "eee, MMM dd");
