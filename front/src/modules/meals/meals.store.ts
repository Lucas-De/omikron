import { create } from "zustand";
import { useAuthenticationStore } from "../authentication/authentication.store";
import { mealsService } from "./meals.service";

interface MealState {
  meals?: any; //TODO : correct type
  loading: boolean;
  listMeals: () => void;
}

export const useMealsStore = create<MealState>((set) => ({
  meals: [],
  loading: false,

  async listMeals() {
    set(() => ({ loading: true }));
    try {
      const userId = useAuthenticationStore.getState().user?.id;
      const meals = await mealsService.list(userId);
      set(() => ({ meals }));
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
