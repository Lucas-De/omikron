import { Button, Dropdown, Flex, Input, MenuProps, Typography } from "antd";
import { useState } from "react";
import {
  CameraOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { MealCreationModal } from "./MealCreationModal";
import { MealTable } from "./MealsTable";

export function MealsView() {
  const [modalMode, setModalMode] = useState<"text" | "image" | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const handleAddWithImage = () => setModalMode("image");
  const handleAddWithText = () => setModalMode("text");

  const items: MenuProps["items"] = [
    {
      key: 1,
      icon: <CameraOutlined />,
      label: <div onClick={handleAddWithImage}>Upload Meal Photo</div>,
    },
    {
      key: 2,
      icon: <EditOutlined />,
      label: <div onClick={handleAddWithText}>Describe Meal</div>,
    },
  ];

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
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow
            trigger={["click"]}
          >
            <Button size="large" type="primary" icon={<PlusOutlined />}>
              Add Meal
            </Button>
          </Dropdown>
        </Flex>

        <MealTable searchQuery={searchQuery} />
      </Flex>

      <MealCreationModal
        mode={modalMode}
        close={() => setModalMode(undefined)}
      />
    </>
  );
}
