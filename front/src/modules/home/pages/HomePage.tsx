import { Layout } from "antd";
import { useAuthenticationStore } from "../../authentication/authentication.store";
import { Content, Header } from "antd/es/layout/layout";
import icon from "/omikron.png";
import { MealTable } from "../components/MealTable";
import Sider from "antd/es/layout/Sider";

export function HomePage() {
  const user = useAuthenticationStore((state) => state.user);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
          padding: "0px 20px",
          background: "black",
          borderBottom: "1px solid #1e1e1e",
          height: "55px",
        }}
      >
        <img src={icon} style={{ height: "30px" }} />
      </Header>

      <Layout style={{ height: "100%" }}>
        <Sider width={250} style={{ borderRight: "1px solid #1e1e1e" }}></Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <MealTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
