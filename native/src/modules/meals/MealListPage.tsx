import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import MealCard from "./MealCard";
import { Page } from "../../common/components/Page";
import MealCreationButtons from "./MealCreationButtons";

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

  const actions = [
    <IconButton
      key="camera"
      icon="camera"
      iconColor="black"
      containerColor="white"
      style={{ height: 36, width: 36, borderRadius: 24 }}
      size={20}
      onPress={pickImage}
    />,
    <IconButton
      key="pen"
      icon="pen"
      iconColor="black"
      containerColor="white"
      style={{ height: 36, width: 36, borderRadius: 24 }}
      size={20}
      onPress={() => setIsModalVisible(true)}
    />,
  ];

  const listOptions = {
    data: [1, 2, 3],
    renderItem: () => <MealCard />,
  };

  return (
    <Page
      title="Meals"
      primaryAction={<MealCreationButtons />}
      scrollableListOptions={listOptions}
    />
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
