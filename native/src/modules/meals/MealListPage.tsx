import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MealCard from "./MealCard";
import { Page } from "../../common/components/Page";
import ModalPage from "../../common/components/ModalPage";
import { MealDescriptionModal } from "./MealDescriptionModal";

export default function MealListPage() {
  const [image, setImage] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pickImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync(); //TODO: handle missing permissions
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    setImage(result.assets[0].uri);
  };

  const listOptions = {
    data: [1, 2, 3, 5, 6, 7, 8],
    renderItem: () => <MealCard />,
  };

  const iconActions = [
    { icon: "camera", action: pickImage },
    { icon: "pen", action: () => setIsModalVisible(true) },
  ];

  return (
    <>
      <MealDescriptionModal
        isOpen={isModalVisible}
        close={() => setIsModalVisible(false)}
      />
      <Page
        title="Meals"
        headerOptions={{ iconActions }}
        scrollableListOptions={listOptions}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroller: {
    width: "100%",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
