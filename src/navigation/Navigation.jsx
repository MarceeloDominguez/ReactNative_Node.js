import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskList from "../screens/TaskList";
import TaskForm from "../screens/TaskForm";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#1B2430",
        },
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          headerTitle: "List Task",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#1B2430" },
        }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskForm}
        options={{
          headerStyle: {
            backgroundColor: "#1B2430",
          },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitle: "Add Task",
        }}
      />
    </Stack.Navigator>
  );
}
