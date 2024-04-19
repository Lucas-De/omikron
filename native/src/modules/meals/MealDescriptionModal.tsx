import React from "react";
import { View, TextInput, Text, StyleSheet, Modal, Button } from "react-native";
import { IconButton } from "react-native-paper";
import { Page } from "../../common/components/Page";
import ModalPage from "../../common/components/ModalPage";

const MAX_LENGTH = 400;

interface Props {
  isOpen: boolean;
  close: () => void;
}

export function MealDescriptionModal(props: Props) {
  return (
    <ModalPage isOpen={props.isOpen} close={props.close}>
      <Text style={styles.guidance}>Enter meal description</Text>
      <TextInput
        autoFocus
        multiline
        maxLength={MAX_LENGTH}
        value={undefined}
        placeholder="Burger and fries..."
        style={styles.input}
        placeholderTextColor="dimgrey"
      />
    </ModalPage>
  );
}

const styles = StyleSheet.create({
  guidance: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  button: {
    color: "blue",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    color: "white",
  },
  input: {
    height: "100%",
    fontSize: 16,
    color: "white",
  },
});
