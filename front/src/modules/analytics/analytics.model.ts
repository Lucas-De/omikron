export interface DateNutrientCount extends NutrientCount {
  date: string;
}

export interface MacroDataPoint extends NutrientCount {
  label: string;
}

export interface NutrientCount {
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
}

export const MACROS: (keyof NutrientCount)[] = [
  "proteins",
  "carbs",
  "fats",
  "calories",
];
