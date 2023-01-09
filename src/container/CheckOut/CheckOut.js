import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Contact from "./Contact/Contact";
import CheckOutSummary from "../../Components/Order/CheckOutSummary/CheckOutSummary";
import { connect } from "react-redux";

class CheckOut extends Component {
  purchaseCanceled = () => {
    this.props.history.goBack();
  };
  purchaseContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            ingredients={this.props.ings}
            checkOutCanceled={this.purchaseCanceled}
            checkOutContinue={this.purchaseContinued}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={Contact}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapToStoreProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapToStoreProps)(CheckOut);
