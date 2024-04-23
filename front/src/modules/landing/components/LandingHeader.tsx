import { Button } from "antd";
import logo from "/images/logo.png";
import { useNavigate } from "react-router-dom";
import { color } from "../../../common/design-tokens/color";

export default function LandingHeader() {
  const navigate = useNavigate();
  const goToSignIn = () => navigate("/login");
  return (
    <>
      <header>
        <img src={logo} className="logo" />
        <Button type="text" onClick={goToSignIn}>
          Sign In
        </Button>
      </header>

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
          background-color: ${color.background};
          z-index: 4;
        }

        .logo {
          height: 20px;
        }
      `}</style>
    </>
  );
}
