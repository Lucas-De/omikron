import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Modal, Button } from "react-native";
import { IconButton } from "react-native-paper";

const MAX_LENGTH = 400;

export function Textarea({ isVisible, setIsVisible }) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 8,
          }}
        >
          <IconButton
            icon="close"
            iconColor="white"
            rippleColor="transparent"
            style={{ height: 24, width: 24, marginHorizontal: 0 }}
            size={24}
            onPress={() => setIsVisible(false)}
          />

          <Button
            title="Done"
            color="white"
            onPress={() => setIsVisible(false)}
          />
        </View>

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
      </View>
    </Modal>
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
  },
});
