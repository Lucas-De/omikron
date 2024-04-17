import { Flex, Spin, Typography } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading?: boolean;
  title?: string;
  rightCorner?: React.ReactNode;
  leftCorner?: React.ReactNode;
}

export function MobilePage(props: Props) {
  const displayActionHeader = Boolean(props.rightCorner || props.leftCorner);

  const actionCorner = displayActionHeader && (
    <Flex justify="space-between">
      <div>{props.rightCorner}</div>
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
