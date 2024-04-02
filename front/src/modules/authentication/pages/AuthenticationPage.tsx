import { Layout } from "antd";
import { LoginCard } from "../components/LoginCard";
const { Content, Footer } = Layout;

export function LoginPage() {
  return (
    <>
      <Layout
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Content
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LoginCard />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Created by Lucas Descause
        </Footer>
      </Layout>
    </>
  );
}
