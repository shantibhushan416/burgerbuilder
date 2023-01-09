import React from "react";
import "./Buttons.css";
import Auxx from "../../../hoc/Auxx";
const Buttons = (props) => (
  <Auxx>
    <button onClick={props.purchaseCancel} className="Button Danger">
      CANCEL
    </button>
    <button onClick={props.purchaseContinue} className="Button Success">
      CONTINUE
    </button>
  </Auxx>
);
export default Buttons;
