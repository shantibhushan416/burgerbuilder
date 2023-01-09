import React, { Component } from "react";
import Input from "../../../Components/UI/Input/Input";
import "./Contact.css";
import axios from "../../../axios-order";
import { connect } from "react-redux";
import Spinners from "../../../Components/UI/Spinners/Spinners";
import withErrorHandler from "../../../hoc/WithErrorHandler/withErrorHandler";
import * as actionTypes from "../../../store/actions/index";

class Contact extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        isValidation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        isValidation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        isValidation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        isValidation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        isValidation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        isValidation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] =
        this.state.orderForm[formElementIdentifier].value;
    }

    const orders = {
      ingredients: this.props.ings,
      price: this.props.price,
      order: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(orders, this.props.token);
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };
  onChangedHandler = (event, elementIndentifer) => {
    const UpdatedOrderForm = { ...this.state.orderForm };

    const orderFormElement = { ...UpdatedOrderForm[elementIndentifer] };
    orderFormElement.value = event.target.value;
    orderFormElement.valid = this.checkValidity(
      orderFormElement.value,
      orderFormElement.isValidation
    );
    orderFormElement.touched = true;
    UpdatedOrderForm[elementIndentifer] = orderFormElement;
    let formIsValid = true;
    for (let inputIdentifier in UpdatedOrderForm) {
      formIsValid = UpdatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: UpdatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.isValidation}
            touched={formElement.config.touched}
            changed={(event) => this.onChangedHandler(event, formElement.id)}
          />
        ))}

        <button
          type="submit"
          disabled={!this.state.formIsValid}
          className="button"
        >
          Order
        </button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinners />;
    }
    return (
      <div className="Contact">
        <h4> Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapToStoreProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapToDispatchProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionTypes.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapToStoreProps,
  mapToDispatchProps
)(withErrorHandler(Contact, axios));
