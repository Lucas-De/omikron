import { Close as CloseIcon } from "@mui/icons-material";
import { Button, Flex } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  disabled?: boolean;
  close: () => void;
  done: () => void;
}

export function MobileModal({
  isOpen = false,
  close,
  done,
  disabled,
  children,
}: Props) {
  const handleDone = () => {
    done();
    close();
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "black",
          boxSizing: "border-box",
          inset: 0,
          position: "fixed",
          zIndex: 1,
          transform: `translateY(${isOpen ? 0 : 100}%)`,
          transition: "transform ease 0.3s",
          paddingTop: "calc(env(safe-area-inset-top) + 12px)",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ color: "white", padding: "0px 16px ", marginBottom: 16 }}
        >
          <CloseIcon onClick={close} style={{ height: 20, marginLeft: -4 }} />
          <Button
            onClick={handleDone}
            type="text"
            style={{ padding: "4px 0px" }}
            disabled={disabled}
          >
            Done
          </Button>
        </Flex>

        <div style={{ padding: "0px 16px " }}>{children}</div>
      </div>
    </>
  );
}
