import React, { Component } from "react";
import axios from "../../axios-order";
import Order from "../../Components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import Spinners from "../../Components/UI/Spinners/Spinners";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let order = <Spinners />;
    if (!this.props.loading) {
      order = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return <div>{order}</div>;
  }
}
const mapToStoreProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapToDispatchProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionTypes.fetchOrders(token, userId)),
  };
};

export default connect(
  mapToStoreProps,
  mapToDispatchProps
)(withErrorHandler(Orders, axios));
