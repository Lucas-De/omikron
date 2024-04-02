import { Layout } from "antd";
import { LoginCard } from "../components/LoginCard";
import { useNavigate } from "react-router";
import { useAuthenticationStore } from "../authentication.store";
import { useEffect } from "react";
const { Content, Footer } = Layout;

export function LoginPage() {
  const user = useAuthenticationStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  });

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
