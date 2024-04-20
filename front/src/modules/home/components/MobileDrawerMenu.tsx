import {
  FireOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { useAuthenticationStore } from "../../authentication/authentication.store";
import { useNavigate } from "react-router-dom";
import icon from "/broc.png";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export function MobileDrawerMenu({ isOpen, close }: Props) {
  const navigate = useNavigate();
  const logout = useAuthenticationStore((state) => state.logout);

  const items = [
    {
      label: "Meals",
      key: "/mobile/home/meals",
      icon: <FireOutlined />,
    },
    {
      label: "Analytics",
      key: "/mobile/home/analytics",
      icon: <PieChartOutlined />,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    close();
    navigate(key, { replace: true });
  };

  const footer = (
    <Button
      onClick={logout}
      size="middle"
      type="text"
      shape="circle"
      icon={<LogoutOutlined />}
    >
      Log Out
    </Button>
  );
  return (
    <Drawer
      width="80%"
      placement="left"
      closeIcon={null}
      open={isOpen}
      onClose={close}
      footer={footer}
    >
      <img src={icon} style={{ marginLeft: 12, marginBottom: 8, height: 25 }} />
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleMenuClick}
      />
    </Drawer>
  );
}
