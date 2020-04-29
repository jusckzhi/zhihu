import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import collections from "./collections";
import home from "./home";

const reducer = combineReducers({
  collections,
  home,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
