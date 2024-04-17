import { Button, Flex, Spin, Typography } from "antd";
import { PropsWithChildren, useState } from "react";
import { DrawerMenu } from "./DrawerMenu";
import { MenuOutlined } from "@ant-design/icons";

interface Props extends PropsWithChildren {
  loading?: boolean;
  title?: string;
  rightCorner?: React.ReactNode;
  leftCorner?: React.ReactNode;
}

export function MobilePage(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const setIsOpen = (value: boolean) => {
    document.body.style.overflowY = value ? "hidden" : "scroll";
    setIsMenuVisible(value);
  };

  const actionCorner = (
    <Flex justify="space-between" align="center">
      <div>
        <Button
          onClick={() => setIsOpen(true)}
          size="middle"
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
        />
        <DrawerMenu isOpen={isMenuVisible} setIsOpen={setIsOpen} />
      </div>
      <div>{props.leftCorner}</div>
    </Flex>
  );

  const loaderPage = (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Spin spinning={true} />
    </Flex>
  );

  const title = props.title && (
    <Typography.Title>{props.title}</Typography.Title>
  );

  if (props.loading) return loaderPage;
  return (
    <div style={{ padding: 16 }}>
      {actionCorner} {title} {props.children}
    </div>
  );
}
