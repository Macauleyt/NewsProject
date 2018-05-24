import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// Production store does not use __REDUX_DEVTOOLS_EXTENSION__COMPOSE causing previous errors
const initialState = {};

const middleware = [thunk];

const enhancer = applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, enhancer);

export default store;
