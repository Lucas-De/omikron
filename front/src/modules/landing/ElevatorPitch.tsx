import Typewriter from "./Typewriter";

export default function ElevatorPitch() {
  return (
    <>
      <div>
        <Typewriter />
        <p className="pitch-content">
          Tracking your calories and macros is as easy as snapping a pic or
          typing a quick description! Spend just 2 minutes a day to stay healthy
          effortlessly. Join us and start your journey to a healthier you today!
        </p>
      </div>

      <style jsx>{`
        .pitch-content {
          color: white;
          margin-top: 52px;
          line-height: 28px;
        }
      `}</style>
    </>
  );
}
