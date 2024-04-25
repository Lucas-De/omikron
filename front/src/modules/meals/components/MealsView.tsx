import { Flex, Input, Typography } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { MealTable } from "./MealsTable";
import { MealCreationButton } from "./MealCreationButton";

export function MealsView() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Typography.Title>Meals</Typography.Title>

      <Flex vertical style={{ width: "100%" }} gap={16}>
        <Flex justify="space-between" align="center" gap={16}>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            size="large"
            prefix={<SearchOutlined />}
          />
          <MealCreationButton type="desktop" />
        </Flex>

        <MealTable searchQuery={searchQuery} />
      </Flex>
    </>
  );
}
