import LandingSectionIntro from "./components/LandingSectionIntro";
import LandingHeader from "./components/LandingHeader";

export default function Landing() {
  return (
    <>
      <div className="landing-page">
        <LandingHeader />
        <LandingSectionIntro />
      </div>

      <style jsx>{`
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
