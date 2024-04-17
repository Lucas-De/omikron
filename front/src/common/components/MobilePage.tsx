import { Flex, Spin, Typography } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading?: boolean;
  title?: string;
}

export function MobilePage(props: Props) {
  const loaderPage = (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Spin spinning={true} />
    </Flex>
  );

  const title = props.title ? (
    <Typography.Title>{props.title}</Typography.Title>
  ) : null;

  return props.loading ? (
    loaderPage
  ) : (
    <>
      {title} {props.children}
    </>
  );
}
