import { create } from "zustand";
import { useAuthenticationStore } from "../authentication/authentication.store";
import { mealsService } from "./meals.service";
import { Meal } from "./meals.model";

interface MealState {
  meals: Meal[]; //TODO : correct type
  loading: boolean;
  processing: boolean;
  listMeals: () => Promise<void>;
  createMeal: (description: string) => Promise<void>;
}

export const useMealsStore = create<MealState>((set) => ({
  meals: [],
  loading: false,
  processing: false,

  async listMeals() {
    set(() => ({ loading: true }));
    try {
      const userId = useAuthenticationStore.getState().user?.id;
      const meals = await mealsService.list(userId);
      set(() => ({ meals }));
    } finally {
      set(() => ({ loading: false }));
    }
  },

  async createMeal(description: string) {
    set(() => ({ processing: true }));
    try {
      const userId = useAuthenticationStore.getState().user?.id;
      const date = new Date().toISOString();
      const meal = await mealsService.create(userId, description, date);
      set((state) => ({ meals: [meal, ...state.meals] }));
    } finally {
      set(() => ({ processing: false }));
    }
  },
}));
