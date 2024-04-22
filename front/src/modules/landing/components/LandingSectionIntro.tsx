import ElevatorPitch from "./ElevatorPitch";
import MealPreview from "./MealPreview";

export default function LandingSectionIntro() {
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
          justify-content: space-between;
          display: flex;
          flex-wrap: wrap;
          width: 70%;
          padding: 0px 16px;
          column-gap: 32px;
        }

        .meal-preview {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .meal-preview-content {
          width: 330px;
          height: 100%;
        }

        .elevator-pitch {
          flex: 1;
          height: 100vh;
          align-items: center;
          display: flex;
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
