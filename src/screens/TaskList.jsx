import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../context/TaskContextProvider";
import Loading from "../components/Loading";

export default function TaskList({ navigation }) {
  const isFocused = useIsFocused();
  const { listTask, getTasks, onRefresh, refreshing, isLoading } =
    useTaskContext();
  const { task } = listTask;

  useEffect(() => {
    getTasks();
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B2430" />
      <FlatList
        data={task}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1B2430"]}
            progressBackgroundColor="white"
          />
        }
        renderItem={({ item }) => <TaskCard task={item} />}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskForm")}
        style={styles.containerButton}
        activeOpacity={0.5}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    // marginBottom: 100,
  },
  containerButton: {
    backgroundColor: "#990000",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 12,
  },
  iconButton: {
    fontSize: 35,
    bottom: 1,
    color: "white",
  },
});
