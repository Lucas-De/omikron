import { Tag } from "antd";
import { MealStatus } from "../meals.model";

interface Props {
  status: MealStatus;
}

export function MealStatusTag({ status }: Props) {
  let color = "orange";
  let label = "Analyzing";
  if (status == MealStatus.Processed) {
    color = "green";
    label = "Processed";
  }
  if (status == MealStatus.Error) {
    color = "error";
    label = "Error";
  }
  return <Tag color={color}>{label}</Tag>;
}
