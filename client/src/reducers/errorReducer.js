import { GET_ERRORS } from "../actions/types.js";
//errors array is initialy empty
const initialState = {};
//errors arrary is filled with payload of corresponding error
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
