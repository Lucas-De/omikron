import { Button, Flex, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import icon from "/broc.png";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router";
import { FireOutlined, PieChartOutlined } from "@ant-design/icons";
import { useAuthenticationStore } from "../../authentication/authentication.store";

const items = [
  {
    label: "Meals",
    key: "/home/meals",
    icon: <FireOutlined />,
  },
  {
    label: "Analytics",
    key: "/home/analytics",
    icon: <PieChartOutlined />,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const logout = useAuthenticationStore((state) => state.logout);
  const handleMenuClick = (item: { key: string }) => {
    navigate(item.key, { replace: true });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 20px",
          borderBottom: "1px solid #1e1e1e",
          height: "55px",
        }}
      >
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <img src={icon} style={{ height: "30px" }} />
          <Button type="text" style={{ color: "white" }} onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Header>

      <Layout style={{ height: "100%" }}>
        <Sider width={250} style={{ borderRight: "1px solid #1e1e1e" }}>
          <Menu
            defaultSelectedKeys={[window.location.pathname]}
            mode="inline"
            theme="dark"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>

        <Content
          style={{
            padding: "0px 32px 32px 32px",
            margin: 0,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
