import React from "react";
import { CheckIcon, DeleteIcon, EditIcon, InfoIcon, UncheckIcon } from "./Svg";

export default function ToDoList(props) {
  const onReadTodo = (name) => {
    props.onReadTodo(name);
  };
  const onEditTodo = (name) => {
    props.onEditTodo(name);
  };
  const onDeleteTodo = (name) => {
    props.onDeleteTodo(name);
  };
  return props.todos.length > 0 ? (
    <ul className="listItemUl">
      {props.todos.map((todo, idx) => {
        const past = new Date() > new Date(todo.expireDate);
        return (
          <li
            key={idx}
            className={`${past ? "done" : ""} listItem flex v-ct h-sb`}
          >
            <div className="inLeft flex v-ct">
              {past ? <CheckIcon /> : <UncheckIcon />}
              <div className="summary">
                <b>{todo.name}</b>
                <p>Status {past ? "Done" : "To do"}</p>
                <p>
                  Expires on {`${formatDateTime(todo.expireDate)}`}
                </p>
              </div>
            </div>
            <div className="inRight">
              <InfoIcon
                onClick={() => {
                  onReadTodo(encodeURI(todo.name));
                }}
              />
              <EditIcon
                onClick={() => {
                  onEditTodo(encodeURI(todo.name));
                }}
              />
              <DeleteIcon
                onClick={() => {
                  onDeleteTodo(encodeURI(todo.name));
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <h2>Nothing found</h2>
  );
}

function formatDateTime(date) {
  const dateNum = new Date(date);
  const dt = dateNum.toLocaleDateString();
  const tm = dateNum.toLocaleTimeString();
  return `${dt}, ${tm.replace(/:\d+ /, " ")}`;
}
