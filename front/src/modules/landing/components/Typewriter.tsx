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
    (seq, step) => [...seq, () => setColor(step.color), step.text, 5500, ""],
    []
  );

  return (
    <>
      <div>
        <h1 className="slogan">
          <div className="first-line">Snap a pic 📷 </div>
          <div className="second-line">
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
            opacity: 0.7;
          }
        }

        .second-line {
          white-space: nowrap;
          line-height: 40px;
        }

        .slogan {
          color: white;
          font-weight: 900;
          font-size: 40px;
          min-width: 520px;
          width: 100%;
        }

        h1 {
          margin: 0;
        }
      `}</style>
    </>
  );
}
