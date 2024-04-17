import { Button, Space } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect } from "react";
import { MobileMealCard } from "./MobileMealCard";
import { MobilePage } from "../../../common/components/MobilePage";
import { MealCreationButton } from "./MealCreationButton";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuthenticationStore } from "../../authentication/authentication.store";

export function MobileMealsView() {
  const logout = useAuthenticationStore((state) => state.logout);
  const listMeals = useMealsStore((state) => state.listMeals);
  const loading = useMealsStore((state) => state.loading);
  const meals = useMealsStore((state) => state.meals);
  useEffect(() => {
    listMeals();
  }, []);

  const addButton = <MealCreationButton type="mobile" />;
  const logoutButton = (
    <Button
      onClick={logout}
      size="middle"
      type="text"
      shape="circle"
      icon={<LogoutOutlined />}
    />
  );

  return (
    <>
      <MobilePage
        loading={loading}
        title="Meals"
        leftCorner={addButton}
        rightCorner={logoutButton}
      >
        <Space direction="vertical" size="middle">
          {meals.map((meal) => (
            <MobileMealCard key={meal.id} meal={meal} />
          ))}
        </Space>
      </MobilePage>
    </>
  );
}
