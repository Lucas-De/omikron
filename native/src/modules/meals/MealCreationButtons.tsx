import { ReactNode, useState } from "react";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MealDescriptionModal } from "./MealDescriptionModal";
import { StyleSheet, View } from "react-native";

export default function MealCreationButtons() {
  const [image, setImage] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pickImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.wrapper}>
      <MealDescriptionModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
      <IconButton
        key="camera"
        icon="camera"
        iconColor="black"
        containerColor="white"
        style={{ height: 36, width: 36, borderRadius: 24 }}
        size={20}
        onPress={pickImage}
      />

      <IconButton
        key="pen"
        icon="pen"
        iconColor="black"
        containerColor="white"
        style={{ height: 36, width: 36, borderRadius: 24 }}
        size={20}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
});
