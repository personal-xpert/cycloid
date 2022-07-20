const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.variant}>
      {props.label}
    </button>
  );
};
const TextInput = (props) => {
  const onTextChange = (e) => {
    props.onTextChange(props.name, e.target.value);
  };
  return (
    <div className="textInputContainer">
      <label htmlFor={props.name}>{props.label}</label>
      {!props.textarea ? (
        <input
          type={props.type || "text"}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={onTextChange}
          readOnly={props.readOnly}
        />
      ) : (
        <textarea
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={onTextChange}
          readOnly={props.readOnly}
        />
      )}
    </div>
  );
};

export { Button, TextInput };
