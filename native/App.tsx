import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.card}>
          <Text>hello world</Text>
        </View>
        <View style={styles.card}>
          <Text>hello world</Text>
        </View>
        <View style={styles.card}>
          <Text>hello world</Text>
        </View>
        <View style={styles.card}>
          <Text>hello world</Text>
        </View>
        <View style={styles.card}>
          <Text>hello world</Text>
        </View>
        <Text>Open up App.tsx to start working on your app!!!!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#303030",
    backgroundColor: "#141414",
    marginVertical: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
});
