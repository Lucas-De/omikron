import { Button, Flex, Input, Space, Typography } from "antd";
import { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { MealCreationModal } from "./MealCreationModal";
import { MealTable } from "./MealsTable";

export function MealsView() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

        <MealTable searchQuery={searchQuery} />
      </Space>
      <MealCreationModal isOpen={showModal} close={() => setShowModal(false)} />
    </>
  );
}
