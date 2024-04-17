import { Button, Flex, Spin, Typography } from "antd";
import { PropsWithChildren, useContext } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { MobileMenuContext } from "../../modules/home/pages/MobileHomePage";

interface Props extends PropsWithChildren {
  loading?: boolean;
  title?: string;
  rightCorner?: React.ReactNode;
  leftCorner?: React.ReactNode;
}

export function MobilePage(props: Props) {
  const menuContext = useContext(MobileMenuContext);

  const actionCorner = (
    <Flex justify="space-between" align="center">
      <div>
        <Button
          onClick={menuContext?.openMenu}
          size="middle"
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
        />
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
