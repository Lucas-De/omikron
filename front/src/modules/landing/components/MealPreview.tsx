import { Carousel } from "antd";
import { MobileMealCard } from "../../meals/components/MobileMealCard";
import { MealStatus } from "../../meals/meals.model";
import udon from "/images/udon.jpg";
import potato from "/images/potato.jpg";

const meals = [
  {
    id: 1,
    calories: 290,
    proteins: 15,
    carbs: 42,
    fats: 7,
    description:
      "Japanese udon noodle soup with seaweed, spinach, and crab meat",
    status: MealStatus.Processed,
    image: udon,
    date: new Date().toISOString(),
  },
  {
    id: 2,
    calories: 290,
    proteins: 4,
    carbs: 37,
    fats: 14,
    description: "Roasted mixed potatoes with herbs and onions",
    status: MealStatus.Processed,
    image: potato,
    date: new Date().toISOString(),
  },
];

export default function MealPreview() {
  return (
    <Carousel autoplay dots={true} autoplaySpeed={8000} effect="fade">
      {meals.map((meal, index) => (
        <MobileMealCard key={index} meal={meal} image={meal.image} />
      ))}
    </Carousel>
  );
}
