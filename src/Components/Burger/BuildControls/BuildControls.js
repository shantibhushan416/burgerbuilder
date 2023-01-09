import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const buildControls = (props) => (
  <div className="BuildControls">
    <p>
      Total Price : <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        updatemenu={() => props.AddedIngredients(ctrl.type)}
        deducted={() => props.deductedIngredients(ctrl.type)}
        disable={props.disable[ctrl.type]}
      />
    ))}

    <button
      onClick={props.order}
      disabled={!props.purchasable}
      className="OrderButton"
    >
      {props.isAuth ? "Order Now" : "SignIn To Order"}
    </button>
  </div>
);

export default buildControls;
