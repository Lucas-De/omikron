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
  refreshMeal: (mealId: number) => Promise<void>;
}

export const useMealsStore = create<MealState>((set, get) => ({
  meals: [],
  loading: false,
  processing: false,

  async listMeals() {
    set(() => ({ loading: true }));
    try {
      const userId = useAuthenticationStore.getState().getUserId();
      const meals = await mealsService.list(userId);
      set(() => ({ meals }));
    } finally {
      set(() => ({ loading: false }));
    }
  },

  async createMeal(description: string) {
    set(() => ({ processing: true }));
    try {
      const userId = useAuthenticationStore.getState().getUserId();
      const date = new Date().toISOString();
      const meal = await mealsService.create(userId, description, date);
      set((state) => ({ meals: [meal, ...state.meals] }));
      setTimeout(get().refreshMeal, 4000, meal.id);
    } finally {
      set(() => ({ processing: false }));
    }
  },

  async refreshMeal(mealId: number) {
    const userId = useAuthenticationStore.getState().getUserId();
    const refreshedMeal = await mealsService.get(userId, mealId);

    set((state) => {
      const index = state.meals.findIndex((m) => (m.id = mealId));
      const refreshedMeals = structuredClone(state.meals);
      refreshedMeals[index] = refreshedMeal;

      if (index >= 0) return { meals: refreshedMeals };
      return {};
    });
  },
}));
