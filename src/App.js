import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./container/BurgerBuilder/BurgerBuilder";
import CheckOut from "./container/CheckOut/CheckOut";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Burgerbuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Burgerbuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapToStoreProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};

const mapToDispatchProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState()),
  };
};
export default withRouter(connect(mapToStoreProps, mapToDispatchProps)(App));
