import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types.js";
import { returnErrors } from "./errorActions.js";
import axios from "axios";



export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get("/user", tokenConfig(getState))
      .then(res => {
        //console.log(res.data);
        dispatch({
          type: USER_LOADED,
          payload: res.data
      })})
      .catch(err => {
        console.log(err.response.msg);
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
              type: AUTH_ERROR
          });
      });
}


//set up the request header.
const tokenConfig = (getState) => {
  //return the initial default token is stored from the local storage when the user first signup. This token is exchanged,
  //not username/password when
  const token = getState().token;
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
      "Clear-Site-Data": "cache",
    },
    proxy: {
      host:'localhost',
      port: 4000
    }
  };

  //x-auth-token
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
};

//register.
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-type": "application/json",
      }
    };
    //convert object into json.
    const registeredInformation = JSON.stringify({ name, email, password });
    console.log(registeredInformation)
    axios
      .post("/signUp", registeredInformation, config)
      .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch((errors) => {
        dispatch(
          returnErrors(
            errors.response.data,
            errors.response.status,
            REGISTER_FAIL
          )
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

//login.
export const login =
  ({ password, email }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //convert object into json.
    let registeredInformation = JSON.stringify({ email, password });
    
    axios
      .post("/login", registeredInformation, config)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })})
      .catch((errors) => {
        dispatch(
          returnErrors(errors.response.data, errors.response.status, LOGIN_FAIL)
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

//logout

export const logout = () => (dispatch) => dispatch({ type: LOGOUT_SUCCESS });
