import React from "react";
import "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Auxx from "../../../hoc/Auxx";

const sideDrawer = (props) => {
  let attachClasses = ["SideDrawer", "Close"];
  if (props.show) {
    attachClasses = ["SideDrawer", "Open"];
  }
  return (
    <Auxx>
      <BackDrop show={props.show} clicked={props.closed} />
      <div className={attachClasses.join(" ")}>
        <Logo className="Logo" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxx>
  );
};
export default sideDrawer;
