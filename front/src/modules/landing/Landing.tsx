import LandingHeader from "./components/LandingHeader";
import LandingSectionQa from "./components/LandingSectionQa";
import LandingSectionSlide from "./components/LandingSectionSlide";

export default function Landing() {
  return (
    <>
      <div className="landing-page">
        <LandingHeader />
        <LandingSectionSlide />
        <LandingSectionQa />
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
