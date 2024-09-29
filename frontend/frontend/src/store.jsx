import {createStore , combineReducers , applyMiddleware} from "redux"

import { thunk } from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"
import { productreducer } from "./reducer/productreducer";




const reducer = combineReducers({
    products : productreducer 
});

let initialState={};
const middleware = [thunk];

const Store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)));

export default Store