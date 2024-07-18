import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: false,
  isRegistering: false,
  registerError: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoggingIn: true, loginError: false };
    case LOGIN_SUCCESS:
      return { ...state, isLoggingIn: false, isLoggedIn: true, loginError: false };
    case LOGIN_FAILURE:
      return { ...state, isLoggingIn: false, loginError: true };
    case REGISTER_REQUEST:
      return { ...state, isRegistering: true, registerError: false };
    case REGISTER_SUCCESS:
      return { ...state, isRegistering: false };
    case REGISTER_FAILURE:
      return { ...state, isRegistering: false, registerError: true };
    default:
      return state;
  }
};

export default authReducer;
