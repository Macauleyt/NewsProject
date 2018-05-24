import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
//Set initial state to always false
const initialState = {
  isAuthenticated: false,
  user: {}
};
//Once logged in the user gets sets a state of authorization = true
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
