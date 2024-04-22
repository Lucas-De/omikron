import ElevatorPitch from "./ElevatorPitch";
import MealPreview from "./MealPreview";

export default function LandingSection() {
  return (
    <>
      <section className="main-section">
        <div className="main-section-row">
          <div className="elevator-pitch">
            <ElevatorPitch />
          </div>

          <div className="meal-preview">
            <MealPreview />{" "}
          </div>
        </div>
      </section>

      <style jsx>{`
        section {
          height: 95vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-section-row {
          align-items: center;
          justify-content: space-between;
          display: flex;
          gap: 20%;
          width: 70%;
        }

        .meal-preview {
          width: 330px;
          padding-right: 100px;
        }

        .elevator-pitch {
          width: 500px;
        }
      `}</style>
    </>
  );
}
