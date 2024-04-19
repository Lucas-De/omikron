import { StyleSheet, Text, View } from "react-native";

function NutrientCount() {
  return (
    <View>
      <Text style={styles.countLabel}>Protein</Text>
      <Text style={styles.title}>66</Text>
    </View>
  );
}

export default function MealCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>hello world</Text>
      <View style={styles.counts}>
        <NutrientCount />
        <NutrientCount />
        <NutrientCount />
        <NutrientCount />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 16,
  },

  card: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#303030",
    backgroundColor: "#141414",
    marginVertical: 8,
  },

  counts: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  countLabel: {
    color: "grey",
    fontSize: 12,
    marginBottom: 4,
  },
});
