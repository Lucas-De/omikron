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
            <div className="meal-preview-content">
              <MealPreview />
            </div>
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
          flex-wrap: wrap;
          padding: 0px 80px;
          column-gap: 32px;
          width: 100%;
        }

        .meal-preview {
          width: 690px;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .meal-preview-content {
          height: 100%;
          overflow: hidden;
        }

        .elevator-pitch {
          flex: 1;
          height: 100vh;
          align-items: center;
          display: flex;
          max-width: 600px;
        }

        @media (max-width: 800px) {
          .section-row {
            width: 100%;
          }

          .elevator-pitch {
            height: 90vh;
          }

          .elevator-pitch :global(.slogan) {
            font-size: 30px;
            width: 100%;
            min-width: 0px;
          }
        }
      `}</style>
    </>
  );
}
