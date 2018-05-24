import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("login"))
    .catch(err =>
      dispatch({
        //Putting errors into redux state
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login users get user token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localstorage
      const { token } = res.data;
      //Set token to local localstorage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode Token for userData
      const decoded = jwt_decode(token);
      //set user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        //Putting errors into redux state
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set user logged in

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
