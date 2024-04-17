import { Space } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect } from "react";
import { MobileMealCard } from "./MobileMealCard";
import { MobilePage } from "../../../common/components/MobilePage";

export function MobileMealsView() {
  const listMeals = useMealsStore((state) => state.listMeals);
  const loading = useMealsStore((state) => state.loading);
  const meals = useMealsStore((state) => state.meals);
  useEffect(() => {
    listMeals();
  }, []);

  return (
    <>
      <MobilePage loading={loading}>
        <Space direction="vertical" size="middle">
          {meals.map((meal) => (
            <MobileMealCard key={meal.id} meal={meal} />
          ))}
        </Space>
      </MobilePage>
    </>
  );
}
