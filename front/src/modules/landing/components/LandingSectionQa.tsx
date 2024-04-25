import { Collapse, Typography } from "antd";

const questionAnswers = [
  {
    label: "Is Omikron for me?",
    children:
      "If you're meticulously counting sesame seeds before a UFC weigh-in, Omikron might not be your thing. But if you want an effortless way to track your eating habits, whether you're dieting, bulking up, or just staying healthy, then Omikron is here to make life easier.",
  },
  {
    label: "How does it work?",
    children: (
      <>
        <p>
          Just take pictures of what you eat and we'll analyze it for you. We'll
          give you a breakdown of the nutritional content of your meal, so you
          can track your eating habits and make adjustments to reach your goals.
        </p>
        <p>
          If taking pictures is not for you, just take 2 mins at the end of your
          day to write a quick description of what you ate we'll do the rest.
        </p>
        <p>
          After a few meals, you'll be able to track your habits through our
          analytics dashboards!
        </p>
      </>
    ),
  },
  {
    label: "How much does it cost?",
    children:
      "It's completely free! You can save your hard-earned cash for the food you love.",
  },
  {
    label: "Is Omikron a real comany?",
    children: (
      <>
        Omikron is not a real company but it's a real product!
        <div style={{ fontSize: 12, marginTop: 12 }}>
          Hi there! I'm Lucas Descause, creator of Omikron. I developed Omikron
          as a hobby project to track my protein intake and reach my fitness
          goals. I'm a software engineer passionate about buidling cool
          products. Also passionate about calisthenics and gymnastics. If you
          have any questions or feedback, feel free to reach out to me on
          <a href="https://www.linkedin.com/in/ldescause/"> LinkedIn</a>.
        </div>
      </>
    ),
  },
  {
    label: "How do I get started?",
    children:
      "Just login with your google account and start tracking your meals!",
  },
].map((item, index) => ({ ...item, key: index }));

export default function LandingSectionQa() {
  return (
    <>
      <section id="qa-section">
        <Typography.Title level={2}>
          <span className="title-part">Questions? </span>
          <span className="title-part" style={{ color: "grey" }}>
            Let Us Help!
          </span>
        </Typography.Title>

        <div className="collapse">
          <Collapse
            defaultActiveKey={1}
            items={questionAnswers}
            ghost
            accordion
          />
        </div>
      </section>
      <style jsx>{`
        .collapse {
          width: 100%;
          max-width: 800px;
          margin-top: 20px;
        }
        .collapse :global(.ant-collapse-item) {
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0;
          font-weight: 600;
          font-size: 18px;
          padding: 16px 0px;
        }
        .collapse :global(.ant-collapse-content) {
          font-weight: 400;
          color: darkgrey;
        }

        section {
          width: 100%;
          padding: 60px 16px 120px 16px;
          min-height: 90vh;
          display: flex;
          align-items: center;
          flex-direction: column;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .title-part {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
