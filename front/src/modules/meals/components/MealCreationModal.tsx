import { Button, Modal, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useMealsStore } from "../meals.store";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export function MealCreationModal({ isOpen = false, close }: Props) {
  const createMeal = useMealsStore((state) => state.createMeal);
  const processing = useMealsStore((state) => state.processing);
  const [mealDescription, setMealDescription] = useState("");
  const handleCreate = () => {
    createMeal(mealDescription);
    close();
  };

  return (
    <Modal
      title="Add Meal"
      okText="Add"
      centered={true}
      closable={false}
      open={isOpen}
      onOk={handleCreate}
      onCancel={close}
      footer={[
        <Button key="back" onClick={close} disabled={processing}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={processing}
          onClick={handleCreate}
        >
          Submit
        </Button>,
      ]}
    >
      <Typography.Paragraph style={{ marginTop: -6 }}>
        We'll use AI to automatically estimate your calories and macros
      </Typography.Paragraph>
      <TextArea
        onChange={(e) => setMealDescription(e.target.value)}
        rows={6}
        placeholder="Bowl of carrot and broccoli..."
        maxLength={400}
        disabled={processing}
      />
    </Modal>
  );
}
