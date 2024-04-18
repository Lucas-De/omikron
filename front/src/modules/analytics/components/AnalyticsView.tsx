import { Card, Flex, Statistic, Typography } from "antd";
import { CaloriesLineChart } from "./CaloriesLineChart";
import { MacrosLineChart } from "./MacrosLineChart";
import { useEffect } from "react";
import { useAnalyticsStore } from "../analytics.store";
import {
  getPastWeekNutrientPlotData,
  getAverageDailyNutrientCounts,
} from "../utils/formatting.util";

export function MealStats() {
  const counts = useAnalyticsStore((state) => state.dateNutrientCounts);
  const getCounts = useAnalyticsStore((state) => state.getDateNutrientCounts);
  const formattedMacroCounts = getPastWeekNutrientPlotData(counts);
  const avgDailyCounts = getAverageDailyNutrientCounts(counts);

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div>
      <Typography.Title style={{ marginBottom: 4 }}>Analytics</Typography.Title>

      <Typography.Title level={4}>Daily Average</Typography.Title>
      <Flex gap={16} vertical>
        <Flex gap={12}>
          <CardStat title="Calories" value={avgDailyCounts.calories} />
          <CardStat title="Protein (g)" value={avgDailyCounts.proteins} />
          <CardStat title="Carbs (g)" value={avgDailyCounts.carbs} />
          <CardStat title="Fats (g)" value={avgDailyCounts.fats} />
        </Flex>

        <Typography.Title level={4}>Calories</Typography.Title>
        <Card>
          <CaloriesLineChart data={formattedMacroCounts} />
        </Card>

        <Typography.Title level={4}>Macros</Typography.Title>
        <Card>
          <MacrosLineChart data={formattedMacroCounts} />
        </Card>
      </Flex>
    </div>
  );
}

function CardStat(props: { title: string; value?: number }) {
  return (
    <Card>
      <Statistic title={props.title} value={props.value || "—"} />
    </Card>
  );
}
