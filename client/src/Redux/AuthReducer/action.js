import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionTypes";

export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios
    .post("https://task-manager-fb5d.vercel.app/users/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      // Optionally, save token to local storage or cookies
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE });
      // Optionally, dispatch action to show error message to user
      // dispatch({ type: SHOW_ERROR, payload: err.response.data.message });
    });
};

export const register = (userData) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post("https://task-manager-fb5d.vercel.app/users/register", userData)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS });
      // Optionally, you can dispatch a success action or redirect to login page
      // dispatch({ type: REDIRECT_TO_LOGIN });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILURE });
      // Optionally, dispatch action to show error message to user
      // dispatch({ type: SHOW_ERROR, payload: err.response.data.message });
    });
};
