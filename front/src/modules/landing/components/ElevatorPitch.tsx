import { Button, Flex } from "antd";
import Typewriter from "./Typewriter";
import { useNavigate } from "react-router-dom";

export default function ElevatorPitch() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const handleLearnMore = () => {
    document
      .getElementById("qa-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div>
        <Typewriter />
        <p className="pitch-content">
          Tracking your calories and macros is as easy as snapping a pic or
          writing a short meal description! Spend just 2 minutes a day to stay
          healthy effortlessly. Join us and start your journey to a healthier
          you today!
        </p>

        <Flex gap={20} className="cta">
          <Button type="primary" size="large" onClick={goToLogin}>
            Try it now!
          </Button>
          <Button type="default" size="large" onClick={handleLearnMore}>
            Learn More
          </Button>
        </Flex>
      </div>

      <style jsx>{`
        .pitch-content {
          color: white;
          line-height: 28px;
          margin-top: 12px;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  );
}
