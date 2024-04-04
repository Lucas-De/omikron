import { httpRequest } from "../../utils/api";
import { Meal } from "./meals.model";

export const mealsService = {
  list(userId: number): Promise<Meal[]> {
    return httpRequest({
      path: `/users/${userId}/meals`,
      method: "GET",
      query: { limit: 100 },
    });
  },

  get(userId: number, mealId: number): Promise<Meal> {
    return httpRequest({
      path: `/users/${userId}/meals/${mealId}`,
      method: "GET",
    });
  },

  create(userId: number, description: string, date: string): Promise<Meal> {
    return httpRequest({
      path: `/users/${userId}/meals`,
      method: "POST",
      body: { description, date },
    });
  },
};
