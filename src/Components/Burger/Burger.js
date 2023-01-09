import React from "react";
import BurgerIngrident from "./BurgerIngridents/BurgerIngridents";
import "./Burger.css";
const burger = (props) => {
  let transformedingredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngrident key={igkey + i} type={igkey} />;
      });
    })
    .reduce((acc, el) => {
      return acc.concat(el);
    }, []);

  if (transformedingredients.length === 0) {
    transformedingredients = <p>Please fill something to eat</p>;
  }

  return (
    <div className="Burger">
      <BurgerIngrident type="bread-top" />
      {transformedingredients}
      <BurgerIngrident type="bread-bottom" />
    </div>
  );
};

export default burger;
