import * as actionTypes from "./actionTypes";
import axios from "axios";
export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth_success = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const auth_fail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth_logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const check_auth_timeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(auth_logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(auth_start());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAAun3lq4alVdHiUiIGQ1VZG4rJiyN6PM";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAAun3lq4alVdHiUiIGQ1VZG4rJiyN6PM";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(auth_success(response.data.idToken, response.data.localId));
        dispatch(check_auth_timeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(auth_fail(err.response.data.error));
      });
  };
};

export const set_auth_redirect_path = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(auth_logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(auth_logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(auth_success(token, userId));
        dispatch(
          check_auth_timeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
