import { Flex } from "antd";
import { MobileMealCard } from "../../meals/components/MobileMealCard";
import { MealStatus } from "../../meals/meals.model";
import feta from "/images/feta.webp";
import bagel from "/images/bagel.webp";
import garbanzo from "/images/garbanzo.webp";
import avocado from "/images/avocado.webp";
import peach from "/images/peach.webp";
import salad from "/images/salad.webp";

const column1 = [
  {
    id: 1,
    calories: 350,
    proteins: 12,
    carbs: 45,
    fats: 15,
    description: "Chickpeas in tomato sauce with a dollop of yogurt and herbs.",
    status: MealStatus.Processed,
    image: garbanzo,
    date: new Date().toISOString(),
  },
  {
    id: 3,
    calories: 69,
    proteins: 1,
    carbs: 16,
    fats: 0,
    description: "Sliced fresh peaches",
    status: MealStatus.Processed,
    image: peach,
    date: new Date().toISOString(),
  },
  {
    id: 2,
    calories: 410,
    proteins: 12,
    carbs: 25,
    fats: 30,
    description:
      "Avocado on toast with cheese and almonds, accompanied by a soft-boiled egg.",
    status: MealStatus.Processed,
    image: avocado,
    date: new Date().toISOString(),
  },
];

const column2 = [
  {
    id: 4,
    calories: 325,
    proteins: 10,
    carbs: 25,
    fats: 20,
    description:
      "Salad with arugula, blackberries, pear slices, brie cheese, and walnuts.",
    status: MealStatus.Processed,
    image: salad,
    date: new Date().toISOString(),
  },
  {
    id: 1,
    description:
      "Roasted sweet potatoes, chickpeas, feta cheese, pomegranate seeds, and fresh greens.",
    status: MealStatus.Pending,
    image: feta,
    date: new Date().toISOString(),
  },
  {
    id: 1,
    calories: 400,
    proteins: 17,
    carbs: 50,
    fats: 15,
    description: "Bagel with cream cheese and eggs",
    status: MealStatus.Processed,
    image: bagel,
    date: new Date().toISOString(),
  },
];

export default function MealPreview() {
  return (
    <>
      <div className="shadow-parent">
        <Flex gap={32} style={{ overflow: "hidden" }}>
          <div>
            <div className="slides up">
              {column1.map((meal, index) => (
                <MobileMealCard key={index} meal={meal} image={meal.image} />
              ))}
            </div>
            <div className="slides up">
              {column1.map((meal, index) => (
                <MobileMealCard key={index} meal={meal} image={meal.image} />
              ))}
            </div>
          </div>

          <div style={{ transform: "translateY(-100px)" }}>
            <div className="slides down">
              {column2.map((meal, index) => (
                <MobileMealCard key={index} meal={meal} image={meal.image} />
              ))}
            </div>
            <div className="slides down">
              {column2.map((meal, index) => (
                <MobileMealCard key={index} meal={meal} image={meal.image} />
              ))}
            </div>
          </div>
        </Flex>
      </div>

      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }

        .slides {
          animation: slide 250s infinite linear;
          display: flex;
          gap: 32px;
          width: 325px;
          margin-bottom: 32px;
        }

        .slides.up {
          flex-direction: column;
        }

        .slides.down {
          animation-direction: reverse;
          flex-direction: column-reverse;
        }

        .shadow-parent {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          height: 100%;
          max-height: 1000px;
        }

        .shadow-parent:before,
        .shadow-parent:after {
          position: absolute;
          content: "";
          height: 20%;
          width: 100%;
          z-index: 2;
        }

        .shadow-parent:before {
          top: 0;
          background: linear-gradient(
            to bottom,
            black 0%,
            black 25%,
            transparent 100%
          );
        }

        .shadow-parent:after {
          bottom: 0;
          background: linear-gradient(
            to top,
            black 0%,
            black 25%,
            transparent 100%
          );
        }
      `}</style>
    </>
  );
}
