import { createStore, compose } from "redux";
import rootReducer from "./reducer";
import rootMiddleware from "./middleware";

// const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer(), rootMiddleware());

export default store;
