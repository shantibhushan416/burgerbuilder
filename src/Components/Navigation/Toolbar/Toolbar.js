import React from "react";
import "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import MenuToggler from "../SideDrawer/MenuToggler/MenuToggler";
const toolbar = (props) => (
  <header className="Toolbar">
    <MenuToggler clicked={props.clickedToggler} />

    <Logo height="80%" />

    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
