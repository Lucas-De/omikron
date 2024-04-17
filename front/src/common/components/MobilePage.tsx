import { Flex, Spin, Typography } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading?: boolean;
  title?: string;
  actionCorner?: React.ReactNode;
}

export function MobilePage(props: Props) {
  const loaderPage = (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Spin spinning={true} />
    </Flex>
  );

  const title = props.title && (
    <Typography.Title>{props.title}</Typography.Title>
  );

  const actionCorner = props.actionCorner && (
    <Flex justify="flex-end">{props.actionCorner}</Flex>
  );

  return props.loading ? (
    loaderPage
  ) : (
    <>
      {actionCorner} {title} {props.children}
    </>
  );
}
