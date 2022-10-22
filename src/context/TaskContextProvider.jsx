import { createContext, useCallback, useContext, useState } from "react";
import {
  createTaskRequests,
  deleteTaskRequests,
  getTaskRequests,
  getTasksRequests,
  toggleTaskDoneRequests,
  updateTaskRequests,
} from "../api/task";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [listTask, setListTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    try {
      const res = await getTasksRequests();
      setListTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequests(task);
      setListTask([...listTask, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    const res = await getTaskRequests(id);
    return res.data;
  };

  const updateTask = async (id, newTask) => {
    try {
      const res = await updateTaskRequests(id, newTask);
      setListTask(
        listTask.task.map((task) => (task._id === id ? res.data : task))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      const res = await deleteTaskRequests(id);
      if (res.status === 202) {
        setListTask(listTask.task.filter((task) => task._id !== id));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskDone = async (id) => {
    const taskFound = listTask.task.find((task) => task._id === id);
    const res = await toggleTaskDoneRequests(
      id,
      taskFound.completed === false ? true : false
    );

    setListTask(
      listTask.task.map((task) => {
        return task._id === id ? res.data : task;
      })
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getTasks();

    setRefreshing(false);
  }, []);

  return (
    <taskContext.Provider
      value={{
        createTask,
        listTask,
        updateTask,
        getTask,
        getTasks,
        toggleTaskDone,
        onRefresh,
        refreshing,
        deleteTask,
        isLoading,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(taskContext);

  return context;
};
