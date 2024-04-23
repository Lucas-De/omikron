import ElevatorPitch from "./ElevatorPitch";
import MealPreview from "./MealPreview";

export default function LandingSectionSlide() {
  return (
    <>
      <section>
        <div className="section-row">
          <div className="elevator-pitch">
            <ElevatorPitch />
          </div>

          <div className="meal-preview">
            <MealPreview />
          </div>
        </div>
      </section>

      <style jsx>{`
        section {
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-row {
          align-items: center;
          justify-content: space-evenly;
          display: flex;
          padding: 0px 80px;
          column-gap: 32px;
          width: 100%;
          height: 100vh;
        }

        .meal-preview {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .elevator-pitch {
          flex: 1;
          height: 100vh;
          align-items: center;
          display: flex;
          max-width: 600px;
        }

        @media (max-width: 1405px) {
          .section-row {
            width: 100%;
            padding: 0px 32px;
          }

          .elevator-pitch :global(.slogan) {
            font-size: 30px;
            width: 100%;
            min-width: 0px;
          }

          .meal-preview :global(.slides) {
            width: 280px;
          }
        }

        @media (max-width: 1025px) {
          .section-row {
            padding: 0px 16px;
          }

          .meal-preview {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
