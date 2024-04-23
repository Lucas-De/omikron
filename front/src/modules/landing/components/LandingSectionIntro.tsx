import ElevatorPitch from "./ElevatorPitch";

export default function LandingSectionIntro() {
  return (
    <>
      <section>
        <div className="elevator-pitch">
          <ElevatorPitch />
        </div>
      </section>

      <style jsx>{`
        section {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .elevator-pitch {
          max-width: 750px;
        }

        @media (max-width: 800px) {
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
