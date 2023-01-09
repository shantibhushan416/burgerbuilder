import React from "react";
import "./MenuToggler.css";
const menuToggler = (props) => (
  <div onClick={props.clicked} className="MenuToggler">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default menuToggler;
