import { httpRequest } from "../../utils/api";
import { DateNutrientCount } from "./analytics.model";

export const analyticsService = {
  getDateNutrientCounts(userId: number): Promise<DateNutrientCount[]> {
    return httpRequest({
      path: `/users/${userId}/analytics/meals`,
      query: { lookBackDays: 1 },
      method: "GET",
    });
  },
};
