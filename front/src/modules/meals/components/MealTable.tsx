import { Table, Tag, Typography } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect } from "react";

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description: string) => description.slice(0, 30),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (dateString: string) => new Date(dateString).toDateString(),
  },
  {
    title: "Calories",
    dataIndex: "calories",
    key: "calories",
  },
  {
    title: "Protein (g)",
    dataIndex: "proteins",
    key: "proteins",
  },
  {
    title: "Fat (g)",
    dataIndex: "fats",
    key: "fats",
  },
  {
    title: "Carbs (g)",
    dataIndex: "carbs",
    key: "carbs",
  },
  {
    title: "",
    key: "tags",
    dataIndex: "tags",
    render: () => <Tag color="green">Processed</Tag>,
  },
];

export function MealTable() {
  const meals = useMealsStore((state) => state.meals);
  const rows = meals.map((m: any) => ({ ...m, key: m.id }));
  const listMeals = useMealsStore((state) => state.listMeals);

  useEffect(() => {
    listMeals();
  }, []);

  return (
    <>
      <Typography.Title>Meals</Typography.Title>
      <Table columns={columns} dataSource={rows} pagination={false} />
    </>
  );
}
