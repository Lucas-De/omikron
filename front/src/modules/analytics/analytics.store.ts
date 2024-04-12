import { create } from "zustand";
import { DateNutrientCount } from "./analytics.model";
import { analyticsService } from "./analytics.service";
import { useAuthenticationStore } from "../authentication/authentication.store";

interface AnalyticsState {
  loading: boolean;
  dateNutrientCounts: DateNutrientCount[];
  getDateNutrientCounts: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  loading: false,
  dateNutrientCounts: [],

  async getDateNutrientCounts() {
    const userId = useAuthenticationStore.getState().getUserId();
    const dateNutrientCounts = await analyticsService.getDateNutrientCounts(
      userId
    );
    set(() => ({ dateNutrientCounts }));
  },
}));
