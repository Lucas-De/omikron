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
    calories: 290,
    proteins: 15,
    carbs: 42,
    fats: 7,
    description:
      "Garbanzo beans with feta cheese, cherry tomatoes, and parsley",
    status: MealStatus.Processed,
    image: garbanzo,
    date: new Date().toISOString(),
  },
  {
    id: 3,
    calories: 290,
    proteins: 4,
    carbs: 37,
    fats: 14,
    description: "Peach",
    status: MealStatus.Processed,
    image: peach,
    date: new Date().toISOString(),
  },
  {
    id: 2,
    calories: 290,
    proteins: 4,
    carbs: 37,
    fats: 14,
    description: "Avocado toast with poached egg",
    status: MealStatus.Processed,
    image: avocado,
    date: new Date().toISOString(),
  },
];

const column2 = [
  {
    id: 4,
    calories: 290,
    proteins: 4,
    carbs: 37,
    fats: 14,
    description: "Salad",
    status: MealStatus.Processed,
    image: salad,
    date: new Date().toISOString(),
  },
  {
    id: 1,
    description: "Feta cheese with cherry tomatoes, and parsley",
    status: MealStatus.Pending,
    image: feta,
    date: new Date().toISOString(),
  },
  {
    id: 1,
    calories: 290,
    proteins: 15,
    carbs: 42,
    fats: 7,
    description: "Bagel with egg, cheese, and bacon",
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
          padding: 30px 0px;
          white-space: nowrap;
          position: relative;
          height: 100vh;
        }

        .shadow-parent:before,
        .shadow-parent:after {
          position: absolute;
          content: "";
          height: 30%;
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
