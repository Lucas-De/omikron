import { create } from "zustand";
import { useAuthenticationStore } from "../authentication/authentication.store";
import { mealsService } from "./meals.service";
import { Meal } from "./meals.model";

interface MealState {
  meals: Meal[];
  loading: boolean;
  processing: boolean;
  listMeals: () => Promise<void>;
  createMeal: (mealData: CreateMealOptions) => Promise<void>;
  refreshMeal: (mealId: number) => Promise<void>;
}

interface CreateMealOptions {
  description?: string;
  base64Image?: string;
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

  async createMeal({ description, base64Image }: CreateMealOptions) {
    set(() => ({ processing: true }));
    try {
      const userId = useAuthenticationStore.getState().getUserId();
      const date = new Date().toISOString();
      const meal = await mealsService.create(
        userId,
        description,
        base64Image,
        date
      );
      set((state) => ({ meals: [meal, ...state.meals] }));
      setTimeout(get().refreshMeal, 4000, meal.id);
    } finally {
      set(() => ({ processing: false }));
    }
  },

  //TODO: keep polling until meal is analyzed
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
