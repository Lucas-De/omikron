import { Modal, Text, View, StyleSheet } from "react-native";
import { Page } from "./Page";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  close: () => void;
}

export default function ModalPage(props: Props) {
  const headerOptions = {
    primaryAction: {
      label: "Done",
      action: props.close,
    },
  };

  return (
    <Modal
      animationType="slide"
      visible={props.isOpen}
      style={{ width: "100%", height: "100%" }}
    >
      <Page close={props.close} headerOptions={headerOptions}></Page>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
});
