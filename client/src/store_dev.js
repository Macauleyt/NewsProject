import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// Development store
const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);

export default store;
