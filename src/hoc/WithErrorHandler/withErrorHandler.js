import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Auxx from "../Auxx";

const withErrorHandler = (WrapperComponents, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
    errorConfirmHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxx>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponents {...this.props} />
        </Auxx>
      );
    }
  };
};

export default withErrorHandler;
