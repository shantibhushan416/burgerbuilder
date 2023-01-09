import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/",
};

const auth_start = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const auth_success = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};
const auth_logout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const auth_fail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const set_auth_redirect_path = (state, action) => {
  return updateObject(state, { authRedirect: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return auth_start(state, action);
    case actionTypes.AUTH_SUCCESS:
      return auth_success(state, action);
    case actionTypes.AUTH_FAIL:
      return auth_fail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return auth_logout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return set_auth_redirect_path(state, action);
    default:
      return state;
  }
};

export default reducer;
