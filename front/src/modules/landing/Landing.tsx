import { Button } from "antd";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import LandingSection from "./LandingSection";

export default function Landing() {
  const navigate = useNavigate();
  const goToSignIn = () => navigate("/login");
  return (
    <>
      <div className="wrapper">
        <header>
          <img src={logo} className="logo" />
          <Button type="text" onClick={goToSignIn}>
            Sign In
          </Button>
        </header>

        <LandingSection />

        <section></section>
      </div>

      <style jsx>{`
        header {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: black;
          z-index: 1;
        }

        section {
          height: 90vh;
          width: 100vw;
        }

        .logo {
          height: 20px;
        }

        .main-section {
          height: 95vh;
          width: 100vw;
          background-color: black;
          display: flex;
          align-items: center;
          justify-content: space-around;
          display: flex;
          flex-wrap: wrap;
        }

        .elevator-pitch {
          width: 500px;
        }

        .runner {
          height: 400px;
          opacity: 0;
        }

        .wrapper {
          overflow-y: scroll;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </>
  );
}
