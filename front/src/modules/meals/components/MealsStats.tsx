import { Card, Flex, Statistic, Typography } from "antd";
import { CaloriesLineChart } from "./CaloriesLineChart";
import { MacrosLineChart } from "./MacrosLineChart";

export function MealStats() {
  return (
    <div>
      <Typography.Title style={{ marginBottom: 4 }}>Stats</Typography.Title>
      <Typography.Paragraph>This Month</Typography.Paragraph>
      <Flex gap={16} vertical>
        <Flex gap={12}>
          <Card>
            <Statistic title="Calories" value={112893} />
          </Card>
          <Card>
            <Statistic title="Protein (g)" value={112893} />
          </Card>
          <Card>
            <Statistic title="Carbs (g)" value={112893} />
          </Card>
          <Card>
            <Statistic title="Fats (g)" value={112893} />
          </Card>
        </Flex>
        <Card>
          <div>
            <CaloriesLineChart />
          </div>
        </Card>

        <Card>
          <div>
            <MacrosLineChart />
          </div>
        </Card>
      </Flex>
    </div>
  );
}
