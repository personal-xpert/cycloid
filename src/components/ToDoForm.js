import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Button, TextInput } from "./Form";

const ToDoForm = (props) => {
  const onTextChange = (name, value) => {
    props.onInputDataChange(name, value);
  };
  const title = { add: "Add To Do", edit: "Edit To Do", read: "Details" };
  return (
    <div>
      <Modal open={props.opened} onClose={props.onClose} center>
        <div className="modalForm">
          <h2>{title[props.action]}</h2>
          <TextInput
            name="name"
            value={props.fields.name}
            onTextChange={onTextChange}
            label="Name"
            readOnly={props.action === "read"}
          />

          {props.action === "read" && (
            <TextInput
              name="creationDate"
              type="text"
              value={new Date(props.fields.creationDate).toLocaleString()}
              label="Created date"
              readOnly={true}
            />
          )}
          <TextInput
            name="expireDate"
            type="datetime-local"
            value={props.fields.expireDate}
            onTextChange={onTextChange}
            label="Expire date"
            readOnly={props.action === "read"}
          />
          <TextInput
            textarea
            name="description"
            value={props.fields.description}
            onTextChange={onTextChange}
            label="Description"
            readOnly={props.action === "read"}
          />
          <Button
            variant="primary"
            label={props.action}
            onClick={props.onSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ToDoForm;
