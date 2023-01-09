import React from "react";
import Auxx from "../../../hoc/Auxx";
import Buttons from "../../UI/Button/Buttons";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxx>
      <h3>Order List</h3>
      <p>A delicious burger with following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Buttons
        purchaseCancel={props.purchaseCanceler}
        purchaseContinue={props.purchaseContinue}
      />
    </Auxx>
  );
};

export default orderSummary;
