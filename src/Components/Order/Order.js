import React from "react";
import "./Order.css";
const order = (props) => {
  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong>
      </p>
    </div>
  );
};

export default order;
