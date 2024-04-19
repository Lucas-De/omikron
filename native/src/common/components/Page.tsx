import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { PropsWithChildren, ReactNode } from "react";
import Constants from "expo-constants";
import { IconButton } from "react-native-paper";

interface Props extends PropsWithChildren {
  title?: string;
  close?: () => void;
  headerOptions?: {
    iconActions?: { icon: string; action: () => void }[];
    primaryAction?: { label: string; action: () => void };
  };
  scrollableListOptions?: {
    data: any[];
    renderItem: ListRenderItem<any>;
  };
}

export function Page(props: Props) {
  const hasPrimaryAction =
    props.headerOptions && props.headerOptions.primaryAction;

  const primaryAction = props.headerOptions &&
    props.headerOptions.primaryAction && (
      <View style={{ paddingRight: 12 }}>
        <Button
          title={props?.headerOptions?.primaryAction?.label}
          onPress={props?.headerOptions?.primaryAction?.action}
          color="white"
        />
      </View>
    );

  const headerIconActions =
    props.headerOptions &&
    props.headerOptions.iconActions &&
    props.headerOptions.iconActions?.map((button, index) => (
      <IconButton
        key={index}
        icon={button.icon}
        iconColor="black"
        containerColor="white"
        style={styles.iconButton}
        size={20}
        onPress={button.action}
      />
    ));

  const leftHeader = props.close ? (
    <IconButton
      icon="close"
      iconColor="white"
      containerColor="transparent"
      style={{ marginLeft: 8 }}
      size={24}
      onPress={props.close}
    />
  ) : (
    <View>
      {props.title && <Text style={styles.title}>{props.title}</Text>}
    </View>
  );

  const header = (
    <View style={{ ...styles.header, paddingTop: hasPrimaryAction ? 0 : 20 }}>
      {leftHeader}
      <View style={styles.headerActions}>
        {primaryAction || headerIconActions}
      </View>
    </View>
  );

  if (props.scrollableListOptions) {
    return (
      <View style={styles.wrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 12 }}
          keyboardShouldPersistTaps="always"
          data={props.scrollableListOptions.data}
          renderItem={props.scrollableListOptions.renderItem}
          ListHeaderComponent={header}
        />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {header}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 8,
  },

  headerActions: {
    flexDirection: "row",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  wrapper: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },

  children: {
    paddingHorizontal: 20,
  },

  iconButton: { height: 36, width: 36, borderRadius: 24, marginLeft: 4 },
});
