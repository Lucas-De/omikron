import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import icon from "/omikron.png";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router";
import { FireOutlined, PieChartOutlined } from "@ant-design/icons";

const items = [
  {
    label: "Meals",
    key: "/home/meals",
    icon: <FireOutlined />,
    isSelected: true,
  },
  {
    label: "Stats",
    key: "/home/stats",
    icon: <PieChartOutlined />,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const handleMenuClick = (item: { key: string }) => {
    navigate(item.key, { replace: true });
  };

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
        <Sider width={250} style={{ borderRight: "1px solid #1e1e1e" }}>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
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
