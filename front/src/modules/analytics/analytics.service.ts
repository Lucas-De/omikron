import { httpRequest } from "../../utils/api";
import { DateNutrientCount } from "./analytics.model";

export const analyticsService = {
  getDateNutrientCounts(userId: number): Promise<DateNutrientCount[]> {
    return httpRequest({
      path: `/users/${userId}/analytics/meals`,
      method: "GET",
    });
  },
};
