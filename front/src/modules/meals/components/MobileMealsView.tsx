import { Space, Typography } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect } from "react";
import { MobileMealCard } from "./MobileMealCard";
import { MobilePage } from "../../../common/components/MobilePage";
import { MealCreationButton } from "./MealCreationButton";

export function MobileMealsPage() {
  const listMeals = useMealsStore((state) => state.listMeals);
  const loading = useMealsStore((state) => state.loading);
  const meals = useMealsStore((state) => state.meals);
  useEffect(() => {
    listMeals();
  }, []);

  const addButton = <MealCreationButton type="mobile" />;

  const mealList = (
    <Space direction="vertical" size="middle">
      {meals.map((meal) => (
        <MobileMealCard key={meal.id} meal={meal} />
      ))}
    </Space>
  );

  return (
    <>
      <MobilePage loading={loading} title="Meals" leftCorner={addButton}>
        {meals.length ? (
          mealList
        ) : (
          <Typography.Paragraph style={{ color: "grey", marginTop: "-16px" }}>
            Add meals to get started!
          </Typography.Paragraph>
        )}
      </MobilePage>
    </>
  );
}
