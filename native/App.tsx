import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import MealCard from "./MealCard";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Textarea } from "./Textarea";

export default function App() {
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

  const header = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 40,
        paddingBottom: 8,
      }}
    >
      <Textarea isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      <Text style={styles.title}>Meals</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconButton
          icon="camera"
          iconColor="black"
          containerColor="white"
          style={{ height: 36, width: 36, borderRadius: 24 }}
          size={20}
          onPress={pickImage}
        />
        <IconButton
          icon="pen"
          iconColor="black"
          containerColor="white"
          style={{ height: 36, width: 36, borderRadius: 24 }}
          size={20}
          onPress={() => setIsModalVisible(true)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <FlatList
        keyboardShouldPersistTaps="always"
        data={[1, 2, 3]}
        renderItem={() => <MealCard />}
        ListHeaderComponent={header}
      />
    </View>
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
