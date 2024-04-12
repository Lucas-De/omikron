export interface Meal {
  id: number;
  date: string;
  description: string;
  calories?: number;
  carbs?: number;
  fats?: number;
  proteins?: number;
  status: MealStatus;
}

export enum MealStatus {
  Pending = "PENDING",
  Processed = "PROCESSED",
  Error = "ERROR",
}
