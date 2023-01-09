import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Auxx from "../../hoc/Auxx";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import "./Layout.css";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  closeSideDrawer = () => {
    this.setState({ showSidedrawer: false });
  };

  showSidedrawers = () => {
    this.setState((prevSider) => {
      return { showSidedrawer: !prevSider.showSidedrawer };
    });
  };
  render() {
    return (
      <Auxx>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          clickedToggler={this.showSidedrawers}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSidedrawer}
          closed={this.closeSideDrawer}
        />
        <main className="Content">{this.props.children}</main>
      </Auxx>
    );
  }
}

const mapToStoreProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapToStoreProps)(Layout);
