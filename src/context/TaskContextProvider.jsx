import { createContext, useContext, useEffect, useState } from "react";
import {
  createTaskRequests,
  getTaskRequests,
  getTasksRequests,
  toggleTaskDoneRequests,
  updateTaskRequests,
} from "../api/task";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [listTask, setListTask] = useState([]);

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

  const toggleTaskDone = async (id) => {
    const taskFound = listTask.task.find((task) => task._id === id);
    await toggleTaskDoneRequests(
      id,
      taskFound.completed === false ? true : false
    );

    // setListTask(
    //   listTask.task.map((task) =>
    //     task._id === id ? { ...task, completed: !task.completed } : task
    //   )
    // );
  };

  return (
    <taskContext.Provider
      value={{
        createTask,
        listTask,
        updateTask,
        getTask,
        getTasks,
        toggleTaskDone,
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
