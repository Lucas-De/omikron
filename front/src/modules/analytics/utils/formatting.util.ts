import { addDays } from "date-fns";
import _ from "lodash";
import { isoFormat, i18nFormat } from "../../../utils/date";
import {
  DateNutrientCount,
  NutrientChartDataPoint,
  NutrientCount,
  MACROS,
} from "../analytics.model";

export function getPastWeekNutrientPlotData(
  counts: DateNutrientCount[]
): NutrientChartDataPoint[] {
  const DAYS = 7;
  const dict: Record<string, NutrientCount> = {};

  const currDate = new Date();

  for (let i = -DAYS; i <= 0; i++) {
    const date = isoFormat(addDays(currDate, i).toISOString());
    dict[date] = {};
  }

  counts.forEach((item) => {
    const key = item.date;
    dict[key] = _.pick(item, ["proteins", "carbs", "fats", "calories"]);
  });

  const dataPoints = Object.entries(dict).map(([date, counts]) => ({
    ...counts,
    label: i18nFormat(date),
  }));

  return dataPoints;
}

export function getAverageDailyNutrientCounts(
  counts: NutrientCount[]
): NutrientCount {
  const avg: NutrientCount = {};
  MACROS.forEach(
    (macro) => (avg[macro] = Math.round(_.meanBy(counts, macro)) || 0)
  );
  return avg;
}
