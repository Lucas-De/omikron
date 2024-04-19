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

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />

      <ScrollView style={styles.scroller}>
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
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon="pen"
              iconColor="black"
              containerColor="white"
              style={{ height: 36, width: 36, borderRadius: 24 }}
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
        <View>
          <FlatList data={[1, 2, 3]} renderItem={() => <MealCard />} />
        </View>
      </ScrollView>
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
