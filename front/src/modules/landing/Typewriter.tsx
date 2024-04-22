import { TypeAnimation } from "react-type-animation";
import GraphemeSplitter from "grapheme-splitter";
import { useState } from "react";

const splitter = new GraphemeSplitter();

export default function Typewriter() {
  const [color, setColor] = useState("red");

  const sequence = [
    { color: "#F46232", text: "calories 🔥" },
    { color: "#A93333", text: "proteins 🥩" },
    { color: "#C9914F", text: "carbs 🍩" },
    { color: "#93994B", text: "fats 🥑" },
  ].reduce<(string | number | (() => void))[]>(
    (seq, step) => [...seq, () => setColor(step.color), step.text, 4000, ""],
    []
  );

  return (
    <>
      <h1 className="slogan">
        <div className="first-line">Snap a pic 📷 </div>
        <div>
          <span>Track your </span>
          <span style={{ color }}>
            <TypeAnimation
              cursor={false}
              speed={1}
              preRenderFirstString={true}
              splitter={(str) => splitter.splitGraphemes(str)}
              sequence={sequence}
              repeat={Infinity}
            />
          </span>
          <span className="blinking-cursor">|</span>
        </div>
      </h1>

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
            opacity: 0.7;
          }
        }

        .slogan {
          color: white;
          font-weight: 900;
          font-size: 40px;
          width: 650px;
          height: 50px;
          line-height: 30px;
        }

        @media (max-width: 500px) {
          .slogan {
            line-height: 16px;
            font-size: 20px;
            width: 250px;
          }
        }

        .slogan .first-line {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
