import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTaskContext } from "../context/TaskContextProvider";

export default function TaskCard({ task }) {
  const navigation = useNavigation();
  const { title, description, background, _id, completed } = task;
  const { toggleTaskDone } = useTaskContext();

  const handleDone = async () => {
    await toggleTaskDone(_id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("TaskForm", { _id })}
    >
      <View style={[{ backgroundColor: background }, styles.cardTask]}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {completed === false ? (
          <Text>Tarea por completar</Text>
        ) : (
          <Text>Tarea completa</Text>
        )}
        <TouchableOpacity onPress={() => handleDone()}>
          <Text>Change</Text>
        </TouchableOpacity>
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
    height: 110,
    padding: 10,
  },
});
