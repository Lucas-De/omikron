import LandingSectionIntro from "./components/LandingSectionIntro";
import LandingHeader from "./components/LandingHeader";

export default function Landing() {
  return (
    <>
      <div className="landing-page">
        <LandingHeader />
        <LandingSectionIntro />
        <section></section>
      </div>

      <style jsx>{`
        section {
          height: 90vh;
          width: 100vw;
        }

        .runner {
          height: 400px;
          opacity: 0;
        }

        .landing-page {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </>
  );
}
