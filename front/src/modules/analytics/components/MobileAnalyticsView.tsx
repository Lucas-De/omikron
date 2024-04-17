import { PropsWithChildren, useEffect } from "react";
import { useAnalyticsStore } from "../analytics.store";
import { DateNutrientCount, MACROS, NutrientCount } from "../analytics.model";
import { addDays } from "date-fns";
import _ from "lodash";
import { i18nFormat, isoFormat } from "../../../utils/date";
import { MobilePage } from "../../../common/components/MobilePage";
import { Typography, Flex, Card, Statistic } from "antd";
import { CaloriesLineChart } from "./CaloriesLineChart";
import { MacrosLineChart } from "./MacrosLineChart";

export function MobileAnalyticsView() {
  const counts = useAnalyticsStore((state) => state.dateNutrientCounts);
  const loading = useAnalyticsStore((state) => state.loading);
  const getCounts = useAnalyticsStore((state) => state.getDateNutrientCounts);
  const formattedMacroCounts = formatData(counts);
  const avgDailyCounts = getAvgDailyCounts(formattedMacroCounts);

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <MobilePage loading={loading} title="Analytics">
      <Typography.Title level={4}>Daily Average</Typography.Title>
      <Flex gap={16} vertical>
        <StatCard title="Calories" value={avgDailyCounts.calories} />

        <Flex gap={12} wrap="wrap">
          <StatCard title="Protein (g)" value={avgDailyCounts.proteins} />
          <StatCard title="Carbs (g)" value={avgDailyCounts.carbs} />
          <StatCard title="Fats (g)" value={avgDailyCounts.fats} />
        </Flex>

        <Typography.Title level={4}>Calories</Typography.Title>
        <GraphCard>
          <CaloriesLineChart data={formattedMacroCounts} />
        </GraphCard>

        <Typography.Title level={4}>Macros</Typography.Title>

        <GraphCard>
          <MacrosLineChart data={formattedMacroCounts} />
        </GraphCard>
      </Flex>
    </MobilePage>
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

function StatCard({ title, value }: { title: string; value?: number }) {
  const titleNode = <span style={{ fontSize: 11 }}>{title}</span>;
  return (
    <Card style={{ flex: 1 }}>
      <Statistic title={titleNode} value={value || 0} />
    </Card>
  );
}

function GraphCard({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
        position: "relative",
      }}
    >
      <Card style={{ width: 900 }}>{children}</Card>
    </div>
  );
}
