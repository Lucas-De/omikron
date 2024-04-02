import { httpRequest } from "../../utils/api";

export const mealsService = {
  list(userId: number): Promise<unknown> {
    return httpRequest({
      path: `/users/${userId}/meals`,
      method: "GET",
      query: { limit: 100 },
    });
  },
};
