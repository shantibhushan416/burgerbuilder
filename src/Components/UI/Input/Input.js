import React from "react";
import "./Input.css";
const input = (props) => {
  let input = [];
  const inputClasses = ["Input"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
  }
  switch (props.elementType) {
    case "input":
      input = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      input = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      input = (
        <select
          className={inputClasses.join(" ")}
          onChange={props.changed}
          key={props.value}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      input = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {input}
    </div>
  );
};

export default input;
