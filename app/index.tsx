import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import { useTheme } from "@react-navigation/native";

const MAX_LENGTH = 200;
const HALF_HEIGHT = Dimensions.get("window").height / 2;

type NOTE_TYPES = string | (string | JSX.Element)[];

const AddNewScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const textInputRef = useRef(null);

  const [note, setNote] = useState<NOTE_TYPES>("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Quick Note",
      headerRight: HeaderRight,
    });
  }, [note]);

  const HeaderRight = useCallback(() => {
    let isDisabled = note?.length === 0;
    return (
      <Pressable
        disabled={isDisabled}
        style={[
          styles.postButton,
          isDisabled && styles.halfOpacity,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={quickAddItem}
      >
        <Text style={styles.headerText}>{"Save"}</Text>
      </Pressable>
    );
  }, [note]);

  const quickAddItem = () => {};

  const updateNote = (e: string) => {
    if (e.length > MAX_LENGTH - 1) {
      const first = e.substring(0, MAX_LENGTH);
      const second = e.substring(MAX_LENGTH, e.length);
      const colored = second.split("").map((item, index) => {
        return (
          <Text
            key={index.toString()}
            style={{ backgroundColor: theme.colors.bgRed }}
          >
            {item}
          </Text>
        );
      });
      setNote([first, ...colored]);
    } else {
      setNote(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <Pressable onPress={() => {}} style={styles.textRow}>
          <Text style={[styles.headText, { color: theme.colors.primary }]}>
            Note :
          </Text>
          {note?.length > 0 && (
            <Text
              onPress={() => setNote("")}
              style={[styles.cancelText, { color: theme.colors.primary }]}
            >
              Clear
            </Text>
          )}
        </Pressable>
        <TextInput
          ref={textInputRef}
          onChangeText={updateNote}
          placeholder={"Jot down your thought."}
          placeholderTextColor={"gray"}
          style={[styles.textInputStyle, { color: theme.colors.text }]}
          multiline
        >
          <Text>{note}</Text>
        </TextInput>
        {note?.length !== 1 && typeof note === "object" && (
          <View style={styles.limitView}>
            <View style={styles.limitMessageView}>
              <Text style={styles.lengthText}>
                You've exceeded the character limit.
              </Text>
            </View>
            <View style={styles.limitTextView}>
              <Text style={styles.lengthText}>{1 - note.length}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInputStyle: {
    maxHeight: HALF_HEIGHT,
    fontWeight: "normal",
    fontSize: 20,
    padding: 10,
  },
  postButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  headText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "normal",
  },
  lengthText: {
    color: "red",
    fontWeight: "600",
    fontSize: 15,
  },
  textRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  halfOpacity: {
    opacity: 0.5,
  },
  limitView: {
    flexDirection: "row",
    padding: 10,
  },
  limitMessageView: {
    flex: 1.5,
    alignItems: "flex-start",
  },
  limitTextView: {
    flex: 1,
    alignItems: "flex-end",
  },
  exceedBgcolor: {
    backgroundColor: "red",
  },
});

export default AddNewScreen;
