import axios from "axios";
const baseURL =
  "https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items";
const todoID = "db8f640e-e823-4e4c-837b-7239ea3a56c1";
const headers = {
  "Content-Type": "application/json",
};

const axiosAPI = async (config) => {
  const { data } = await axios(config);
  return data;
};

const addTodo = (data) => {
  return axiosAPI({
    headers,
    data,
    method: "POST",
    url: `${baseURL}`,
  });
};

const deleteTodo = (name) => {
  return axiosAPI({
    headers,
    method: "DELETE",
    url: `${baseURL}/object/${todoID}/${name}`,
  });
};

const getTodos = async () => {
  return axiosAPI({
    headers,
    method: "GET",
    url: `${baseURL}/${todoID}`,
  });
};

const getTodoByName = (name) => {
  return axiosAPI({
    headers,
    method: "GET",
    url: `${baseURL}/object/${todoID}/${name}`,
  });
};

export { todoID, getTodos, getTodoByName, addTodo, deleteTodo };
export default axiosAPI;
