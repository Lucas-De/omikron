import { CameraOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Button } from "antd";
import { MealCreationModal } from "./MealCreationModal";
import { useState } from "react";

interface Props {
  type: "mobile" | "desktop";
}

export function MealCreationButton({ type }: Props) {
  const [modalMode, setModalMode] = useState<"text" | "image" | undefined>();
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

  const mobileButton = (
    <Button
      size="middle"
      type="default"
      shape="circle"
      icon={<PlusOutlined />}
    />
  );

  const desktopButton = (
    <Button size="large" type="primary" icon={<PlusOutlined />}>
      Add Meal
    </Button>
  );

  return (
    <>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        arrow
        trigger={["click"]}
      >
        {type === "mobile" ? mobileButton : desktopButton}
      </Dropdown>

      <MealCreationModal
        mode={modalMode}
        close={() => setModalMode(undefined)}
      />
    </>
  );
}
