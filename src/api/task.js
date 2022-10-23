import axios from "axios";
import { API } from "@env";

export const createTaskRequests = async (task) =>
  await axios.post(`${API}/task`, task);

export const getTasksRequests = async () => await axios.get(`${API}/`);

export const getTaskRequests = async (id) =>
  await axios.get(`${API}/task/${id}`);

export const updateTaskRequests = async (id, newTask) =>
  await axios.put(`${API}/task/${id}`, newTask);

export const deleteTaskRequests = async (id) =>
  await axios.delete(`${API}/task/${id}`);

export const toggleTaskDoneRequests = async (id, completed) =>
  await axios.put(`${API}/taskToggle/${id}`, completed);
