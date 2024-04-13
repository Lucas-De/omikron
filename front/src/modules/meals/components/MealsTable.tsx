import { Flex, Spin, Table, Tag } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect } from "react";
import { Meal, MealStatus } from "../meals.model";

interface Props {
  searchQuery: string;
}

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description: string) =>
      description.length > 30 ? description.slice(0, 30) + "..." : description,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (dateString: string) => new Date(dateString).toDateString(),
    sorter: (a: Meal, b: Meal) =>
      new Date(a.date).valueOf() - new Date(b.date).valueOf(),
  },
  {
    title: "Calories",
    dataIndex: "calories",
    key: "calories",
    sorter: (a: Meal, b: Meal) => (a.calories ?? 0) - (b.calories ?? 0),
    render: (value: string) => value || "—",
  },
  {
    title: "Protein (g)",
    dataIndex: "proteins",
    key: "proteins",
    sorter: (a: Meal, b: Meal) => (a.proteins ?? 0) - (b.proteins ?? 0),
    render: (value: string) => value || "—",
  },
  {
    title: "Fat (g)",
    dataIndex: "fats",
    key: "fats",
    sorter: (a: Meal, b: Meal) => (a.fats ?? 0) - (b.fats ?? 0),
    render: (value: string) => value || "—",
  },
  {
    title: "Carbs (g)",
    dataIndex: "carbs",
    key: "carbs",
    sorter: (a: Meal, b: Meal) => (a.carbs ?? 0) - (b.carbs ?? 0),
    render: (value: string) => value || "—",
  },
  {
    title: "",
    key: "status",
    dataIndex: "status",
    render: (status: MealStatus) => {
      let color = "orange";
      let label = "Analyzing";
      if (status == MealStatus.Processed) {
        color = "green";
        label = "Processed";
      }
      if (status == MealStatus.Error) {
        color = "red";
        label = "Error";
      }
      return <Tag color={color}>{label}</Tag>;
    },
  },
];

export function MealTable({ searchQuery }: Props) {
  const listMeals = useMealsStore((state) => state.listMeals);
  const loading = useMealsStore((state) => state.loading);
  const meals = useMealsStore((state) => state.meals);
  const rows = meals
    .filter((meal: Meal) =>
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((meal: Meal) => ({
      ...meal,
      key: meal.id,
      processed: meal.calories != null,
    }));

  useEffect(() => {
    listMeals();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" style={{ padding: 12 }}>
        <Spin />
      </Flex>
    );
  }

  return <Table columns={columns} dataSource={rows} pagination={false} />;
}