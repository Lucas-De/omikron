import { Card, Flex, Statistic, Typography } from "antd";
import { CaloriesLineChart } from "./CaloriesLineChart";
import { MacrosLineChart } from "./MacrosLineChart";
import { useEffect } from "react";
import { useAnalyticsStore } from "../analytics.store";
import { DateNutrientCount, MACROS, NutrientCount } from "../analytics.model";
import { addDays } from "date-fns";
import _ from "lodash";
import { i18nFormat, isoFormat } from "../../../utils/date";

export function MealStats() {
  const counts = useAnalyticsStore((state) => state.dateNutrientCounts);
  const getCounts = useAnalyticsStore((state) => state.getDateNutrientCounts);
  const formattedMacroCounts = formatData(counts);
  const avgDailyCounts = getAvgDailyCounts(formattedMacroCounts);

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div>
      <Typography.Title style={{ marginBottom: 4 }}>Analytics</Typography.Title>

      <Typography.Title level={4}>Daily Average</Typography.Title>
      <Flex gap={16} vertical>
        <Flex gap={12}>
          <Card>
            <Statistic title="Calories" value={avgDailyCounts.calories} />
          </Card>
          <Card>
            <Statistic title="Protein (g)" value={avgDailyCounts.proteins} />
          </Card>
          <Card>
            <Statistic title="Carbs (g)" value={avgDailyCounts.carbs} />
          </Card>
          <Card>
            <Statistic title="Fats (g)" value={avgDailyCounts.fats} />
          </Card>
        </Flex>

        <Typography.Title level={4}>Calories</Typography.Title>
        <Card>
          <div>
            <CaloriesLineChart data={formattedMacroCounts} />
          </div>
        </Card>

        <Typography.Title level={4}>Macros</Typography.Title>
        <Card>
          <div>
            <MacrosLineChart data={formattedMacroCounts} />
          </div>
        </Card>
      </Flex>
    </div>
  );
}

function formatData(
  counts: DateNutrientCount[]
): (NutrientCount & { label: string })[] {
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

function getAvgDailyCounts(counts: NutrientCount[]): NutrientCount {
  const avg: NutrientCount = {};
  MACROS.forEach(
    (macro) => (avg[macro] = Math.round(_.meanBy(counts, macro)) || 0)
  );
  return avg;
}
