import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTaskContext } from "../context/TaskContextProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TaskCard({ task }) {
  const navigation = useNavigation();
  const { title, description, _id, completed } = task;
  const { toggleTaskDone, deleteTask, getTasks } = useTaskContext();

  const handleDone = async () => {
    await toggleTaskDone(_id);
    await getTasks();
  };

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete the task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          await deleteTask(_id);
          await getTasks();
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("TaskForm", { _id })}
    >
      <View style={styles.cardTask}>
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: completed === false ? "none" : "line-through",
            },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              textDecorationLine: completed === false ? "none" : "line-through",
            },
          ]}
          numberOfLines={4}
        >
          {description}
        </Text>
        <View style={styles.containerIcons}>
          <TouchableOpacity onPress={() => handleDone()} activeOpacity={1}>
            <Ionicons
              name={
                completed === false ? "close-circle" : "md-checkmark-circle"
              }
              size={32}
              color={completed === false ? "#990000" : "green"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash" size={30} color="#990000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  cardTask: {
    borderRadius: 10,
    backgroundColor: "#191919",
    padding: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#ccc",
    fontWeight: "700",
    lineHeight: 20,
  },
  containerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
});
