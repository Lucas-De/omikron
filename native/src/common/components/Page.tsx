import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title?: string;
  primaryAction?: ReactNode;
  scrollableListOptions?: {
    data: any[];
    renderItem: ListRenderItem<any>;
  };
}

export function Page(props: Props) {
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      {props.primaryAction}
    </View>
  );

  if (props.scrollableListOptions) {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          keyboardShouldPersistTaps="always"
          data={props.scrollableListOptions.data}
          renderItem={props.scrollableListOptions.renderItem}
          ListHeaderComponent={header}
        />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <View>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  contentContainer: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "black",
  },
});
