import React, { Component } from "react";
import Auxx from "../../hoc/Auxx";
import Burger from "../../Components/Burger/Burger";
import Modal from "../../Components/UI/Modal/Modal";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinners from "../../Components/UI/Spinners/Spinners";
import withErrorHandler from "../../hoc/WithErrorHandler/withErrorHandler";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/index";

class Burgerbuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.OnInitIngridents();
  }

  updatePurchases = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  purchaseCanceler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.props.onItPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burgers = this.props.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinners />
    );

    if (this.props.ings) {
      burgers = (
        <Auxx>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            AddedIngredients={this.props.onAddIngredients}
            deductedIngredients={this.props.onRemoveIngredients}
            disable={disabledInfo}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            order={this.purchaseHandler}
            purchasable={this.updatePurchases(this.props.ings)}
          />
        </Auxx>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceler={this.purchaseCanceler}
          purchaseContinue={this.purchaseContinue}
        />
      );
    }

    return (
      <Auxx>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceler}>
          {orderSummary}
        </Modal>
        {burgers}
      </Auxx>
    );
  }
}

const mapToStoreProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapToDispatchProps = (dispatch) => {
  return {
    onAddIngredients: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
    onRemoveIngredients: (ingName) =>
      dispatch(actionTypes.removeIngredient(ingName)),
    OnInitIngridents: () => dispatch(actionTypes.initIngredients()),
    onItPurchase: () => dispatch(actionTypes.purchaseInit()),
    onSetRedirectPath: (path) =>
      dispatch(actionTypes.set_auth_redirect_path(path)),
  };
};
export default connect(
  mapToStoreProps,
  mapToDispatchProps
)(withErrorHandler(Burgerbuilder, axios));
