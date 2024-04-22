import { Carousel } from "antd";
import { MobileMealCard } from "../meals/components/MobileMealCard";
import { MealStatus } from "../meals/meals.model";
import udon from "/udon.jpg";
import potato from "/potato.jpg";

const meals = [
  {
    id: 0,
    calories: 15,
    proteins: 3,
    carbs: 4,
    fats: 1,
    description: "Udon",
    status: MealStatus.Processed,
    image: udon,
    date: new Date().toISOString(),
  },
  {
    id: 1,
    calories: 15,
    proteins: 3,
    carbs: 4,
    fats: 1,
    description: "Potatos",
    status: MealStatus.Processed,
    image: potato,
    date: new Date().toISOString(),
  },
];

export default function MealPreview() {
  return (
    <Carousel autoplay dots={true} autoplaySpeed={10000} effect="fade">
      {meals.map((meal, index) => (
        <MobileMealCard key={index} meal={meal} image={meal.image} />
      ))}
    </Carousel>
  );
}
