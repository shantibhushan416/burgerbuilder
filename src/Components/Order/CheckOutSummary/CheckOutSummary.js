import React from "react";
import Burger from "../../Burger/Burger";
import Buttons from "../../UI/Button/Buttons";
import "./CheckOutSummary.css";
const checkOutSummary = (props) => {
  return (
    <div className="CheckOutSummary">
      <h1>We hope it's tastes well</h1>;
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Buttons
        purchaseCancel={props.checkOutCanceled}
        purchaseContinue={props.checkOutContinue}
      />
    </div>
  );
};

export default checkOutSummary;
