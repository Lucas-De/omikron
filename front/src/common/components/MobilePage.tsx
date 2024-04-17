import { Flex, Spin } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading?: boolean;
}

export function MobilePage(props: Props) {
  const loaderPage = (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Spin spinning={true} />
    </Flex>
  );

  return props.loading ? loaderPage : props.children;
}
