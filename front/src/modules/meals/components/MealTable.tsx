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
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rows = meals
    .filter((meal: Meal) =>
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((meal: Meal) => ({ ...meal, key: meal.id }));
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
