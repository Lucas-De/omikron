import { Card, Flex, Typography } from "antd";
import { Meal } from "../meals.model";
import { MealStatusTag } from "./MealStatus";

interface Props {
  meal: Meal;
  image?: string;
}

export function MobileMealCard({ meal, image }: Props) {
  const nutrients = [
    {
      label: "Calories",
      value: meal.calories,
    },
    {
      label: "Proteins",
      value: meal.proteins,
    },
    {
      label: "Carbs",
      value: meal.carbs,
    },
    {
      label: "Fats",
      value: meal.fats,
    },
  ];
  return (
    <>
      <Card style={{ padding: 0 }} cover={image && <img src={image} />}>
        <Typography.Paragraph
          ellipsis={{ rows: 2 }}
          style={{ whiteSpace: "normal" }}
        >
          {meal.description || "Unknown meal"}
        </Typography.Paragraph>

        <div className="nutrients">
          <Flex gap={12} justify="space-between">
            {nutrients.map((n) => (
              <div key={n.label}>
                <Typography.Text
                  color="red"
                  style={{ fontSize: "11px", color: "grey" }}
                >
                  {n.label}
                </Typography.Text>
                <div>{n.value ?? "—"}</div>
              </div>
            ))}
          </Flex>
        </div>

        <MealStatusTag status={meal.status} />
      </Card>

      <style jsx>{`
        .nutrients {
          padding-bottom: 16px;
        }

        .ant-card-body {
          padding: 0px !important;
        }
      `}</style>
    </>
  );
}
