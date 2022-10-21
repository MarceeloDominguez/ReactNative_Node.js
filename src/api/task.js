import axios from "axios";

export const createTaskRequests = async (task) =>
  await axios.post("http://10.0.2.2:5000/task", task);

export const getTasksRequests = async () =>
  await axios.get("http://10.0.2.2:5000");

export const getTaskRequests = async (id) =>
  await axios.get(`http://10.0.2.2:5000/task/${id}`);

export const updateTaskRequests = async (id, newTask) =>
  await axios.put(`http://10.0.2.2:5000/task/${id}`, newTask);

// export const toggleTaskDoneRequests = async (id, completed) =>
//   await axios.put(`http://10.0.2.2:5000/task/${id}`, completed);

export const toggleTaskDoneRequests = async (id, completed) =>
  await axios.put(`http://10.0.2.2:5000/taskToggle/${id}`, completed);
