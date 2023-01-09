import React from "react";
import "./BuildControl.css";

const buildControl = (props) => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button className="Less" onClick={props.deducted} disabled={props.disable}>
      Less
    </button>
    <button className="More" onClick={props.updatemenu}>
      More
    </button>
  </div>
);

export default buildControl;
