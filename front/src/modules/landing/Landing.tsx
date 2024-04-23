import LandingHeader from "./components/LandingHeader";
import LandingSectionSlide from "./components/LandingSectionSlide";

export default function Landing() {
  return (
    <>
      <div className="landing-page">
        <LandingHeader />
        {/* <LandingSectionIntro /> */}
        <LandingSectionSlide />
      </div>

      <style jsx>{`
        .landing-page {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100vh;
          width: 100vw;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
