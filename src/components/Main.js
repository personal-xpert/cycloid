import React, { useEffect, useState } from "react";
import{
  todoID,
  addTodo,
  deleteTodo,
  getTodoByName,
  getTodos,
} from "../api/api";
import "../styles/main.css";
import { Button } from "./Form";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
const Main = () => {
  const todoObject = {
    id: todoID,
    name: "",
    expireDate: "",
    description: "",
    creationDate: (new Date()).toISOString(),
  };
  // let todoNameEdit = "";
  const [todos, setTodos] = useState([]);
  const [action, setAction] = useState("add");
  const [todoNameEdit, setTodoNameEdit] = useState("");
  const [actualTodo, setActualTodo] = useState(todoObject);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    setTimeout(() => {
      setActualTodo(todoObject);
      setAction("add");
    }, 500);
  };

  const onInputDataChange = (name, value) => {
    setActualTodo({ ...actualTodo, [name]: value });
  };

  const handleSubmitTodoForm = () => {
    setActualTodo({
      ...actualTodo,
      expireDate: new Date(actualTodo.expireDate).toISOString(),
    });
    if (action === "add") {
      addTodo(actualTodo).then(() => {
        setTodos([...todos, actualTodo]);
        handleCloseForm();
      });
    } else {
      deleteTodo(todoNameEdit).then(() => {
        addTodo(actualTodo).then(() => {
          setTodos([
            ...todos.filter((todo) => todo.name !== decodeURI(todoNameEdit)),
            actualTodo,
          ]);
          handleCloseForm();
        });
      });
    }
  };

  const handleReadTodo = (name) => {
    setAction("read");
    handleOpenForm();
    getTodoByName(name).then(() => {
      const [todo] = todos.filter((todo) => todo.name === decodeURI(name));
      setActualTodo(todo);
    });
  };

  const handleEditTodo = (name) => {
    setTodoNameEdit(name);
    handleReadTodo(name);
    setAction("edit");
  };

  const handleDeleteTodo = (name) => {
    deleteTodo(name).then(() => {
      setTodos(todos.filter((todo) => todo.name !== decodeURI(name)));
    });
  };

  useEffect(() => {
    getTodos().then((data) => {
      data.length > 0 && setTodos(data); // dispatch({ type: "START", data });
    });
  }, []);

  return (
    <div>
      <div className="App">
        <header className="flex v-ct h-sb">
          <h1>TODO - CYCLOID</h1>
          <Button variant="outlined" label="ADD NEW" onClick={handleOpenForm} />
        </header>
        <div className="listContainer">
          <ToDoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onReadTodo={handleReadTodo}
            onEditTodo={handleEditTodo}
          />
          <ToDoForm
            action={action}
            fields={actualTodo}
            opened={openForm}
            onClose={handleCloseForm}
            onInputDataChange={onInputDataChange}
            onSubmit={handleSubmitTodoForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
