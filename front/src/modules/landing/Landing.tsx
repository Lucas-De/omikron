import { Typography } from "antd";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomSleep(minMs: number, maxMs: number) {
  const lengthMs = Math.random() * (maxMs - minMs) + minMs;
  return sleep(lengthMs);
}

export default function Landing() {
  //   const [nutrientString, setNutrientString] = useState("");

  //   const iterate = async () => {
  //     while (true) {
  //       await typeString("Calories");
  //       await typeString("Protein");
  //       await typeString("Carbs");
  //       await typeString("Fats");
  //     }
  //   };

  //   const typeString = async (str: string) => {
  //     let word = "";
  //     for (const letter of str) {
  //       await randomSleep(120, 220);
  //       word += letter;
  //       setNutrientString(word);
  //       console.log(word);
  //     }
  //     await sleep(2000);

  //     while (word.length > 0) {
  //       await randomSleep(100, 120);
  //       word = word.slice(0, -1);
  //       setNutrientString(word);
  //       console.log(word);
  //     }
  //     await sleep(1000);
  //   };

  //   useEffect(() => {
  //     iterate();
  //   }, []);

  return (
    <>
      <div className="main">
        <Typography.Title
          level={1}
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 60,
            width: 700,
          }}
        >
          Track your{" "}
          <Typewriter
            words={["Calories", "Protein", "Carbs", "Fats"]}
            cursorBlinking={false}
            cursor={true}
            cursorStyle={<span className="blinking-cursor">|</span>}
            typeSpeed={170}
            deleteSpeed={110}
            delaySpeed={2500}
            loop={true}
          />
        </Typography.Title>
      </div>

      <style jsx>{`
        .blinking-cursor {
          animation: blink 1.1s infinite;
          font-weight: 100;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .main {
          height: 100vh;
          width: 100vw;
          background-color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
