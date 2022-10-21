import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTaskContext } from "../context/TaskContextProvider";

export default function TaskForm({ route }) {
  const navigation = useNavigation();
  const [valueInput, setValueInput] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const { createTask, getTask, updateTask } = useTaskContext();

  useEffect(() => {
    if (route.params && route.params._id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Updating Task" });
      (async () => {
        const { task } = await getTask(route.params._id);
        setValueInput(task);
      })();
    }
  }, []);

  const handleChange = (value, field) => {
    setValueInput({ ...valueInput, [field]: value });
  };

  const handleSubmit = async () => {
    if (!editing) {
      await createTask(valueInput);
    } else {
      await updateTask(route.params._id, valueInput);
    }
    navigation.navigate("TaskList");
  };

  return (
    <ScrollView style={{ flexGrow: 1, paddingHorizontal: 22, paddingTop: 20 }}>
      <Text style={styles.label}>Task</Text>
      <TextInput
        placeholder="Write a task"
        placeholderTextColor="#ccc8"
        style={styles.input}
        value={valueInput.title}
        onChangeText={(e) => handleChange(e, "title")}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Write a description"
        placeholderTextColor="#ccc8"
        value={valueInput.description}
        onChangeText={(value) => handleChange(value, "description")}
        style={[
          styles.input,
          {
            height: 80,
            textAlignVertical: "top",
            paddingVertical: 10,
          },
        ]}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity
        //disabled
        activeOpacity={0.8}
        style={styles.containerButton}
        onPress={handleSubmit}
      >
        <Text style={styles.titleButton}>Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#51557E",
    color: "#EDE4E0",
    marginBottom: 30,
  },
  label: {
    color: "white",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  containerButton: {
    backgroundColor: "#990000",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
  },
  titleButton: {
    color: "white",
    letterSpacing: 0.5,
    fontWeight: "700",
    fontSize: 16,
  },
});
