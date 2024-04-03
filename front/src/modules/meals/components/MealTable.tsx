import { Button, Flex, Input, Space, Table, Tag, Typography } from "antd";
import { useMealsStore } from "../meals.store";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { MealCreationModal } from "./MealCreationModal";
import { Meal } from "../meals.model";

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
    sorter: (a: Meal, b: Meal) => a.calories - b.calories,
    render: (value: string) => value || "—",
  },
  {
    title: "Protein (g)",
    dataIndex: "proteins",
    key: "proteins",
    sorter: (a: Meal, b: Meal) => a.calories - b.calories,
    render: (value: string) => value || "—",
  },
  {
    title: "Fat (g)",
    dataIndex: "fats",
    key: "fats",
    sorter: (a: Meal, b: Meal) => a.calories - b.calories,
    render: (value: string) => value || "—",
  },
  {
    title: "Carbs (g)",
    dataIndex: "carbs",
    key: "carbs",
    sorter: (a: Meal, b: Meal) => a.calories - b.calories,
    render: (value: string) => value || "—",
  },
  {
    title: "",
    key: "processed",
    dataIndex: "processed",
    render: (processed: boolean) => (
      <Tag color={processed ? "green" : "orange"}>
        {processed ? "Processed" : "Pending"}
      </Tag>
    ),
  },
];

export function MealTable() {
  const meals = useMealsStore((state) => state.meals);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rows = meals
    .filter((meal: Meal) =>
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((meal: Meal) => ({
      ...meal,
      key: meal.id,
      processed: meal.calories != null,
    }));

  const listMeals = useMealsStore((state) => state.listMeals);

  useEffect(() => {
    listMeals();
  }, []);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title>Meals</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowModal(true)}
        >
          Add Meal
        </Button>
      </Flex>

      <Space size="small" direction="vertical" style={{ width: "100%" }}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          size="large"
          prefix={<SearchOutlined />}
        />

        <Table columns={columns} dataSource={rows} pagination={false} />
      </Space>
      <MealCreationModal isOpen={showModal} close={() => setShowModal(false)} />
    </>
  );
}
