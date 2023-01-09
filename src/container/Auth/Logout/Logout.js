import React, { Component } from "react";
import * as actionTypes from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchTOProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionTypes.auth_logout()),
  };
};
export default connect(null, mapDispatchTOProps)(Logout);
