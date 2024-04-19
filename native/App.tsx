import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import MealCard from "./MealCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TouchableHighlight onPress={() => {}}>
        <View>
          <Ionicons name="add-circle" size={32} color="white" />
        </View>
      </TouchableHighlight>

      <ScrollView style={styles.scroller}>
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
    paddingTop: 48,
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
