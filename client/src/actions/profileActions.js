import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios //get request to get profile
    .get("/api/profile")
    .then(res =>
      dispatch({
        //storing as redux state
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        //storing as redux state
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios //post reqest to profile database
    .post("/api/profile", profileData)
    .then(res => history.push("/dash2"))
    .catch(err =>
      dispatch({
        //saving as redux state
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    //warning
    axios //delete request
      .delete("/api/profile")
      .then(res =>
        dispatch({
          //save as redux state
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS, //save as redux state
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    //clear profile state on logout
    type: CLEAR_CURRENT_PROFILE
  };
};
