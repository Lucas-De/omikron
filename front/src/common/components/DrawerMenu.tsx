import {
  FireOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { useAuthenticationStore } from "../../modules/authentication/authentication.store";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DrawerMenu({ isOpen, setIsOpen }: Props) {
  const close = () => setIsOpen(false);
  const logout = useAuthenticationStore((state) => state.logout);

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
      title="Basic Drawer"
      placement="left"
      closeIcon={null}
      open={isOpen}
      onClose={close}
      footer={footer}
    >
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </Drawer>
  );
}
