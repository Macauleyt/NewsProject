import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
//Combining reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
