import {createStore,combineReducers,applyMiddleware} from "redux";
import {Authuser,Blogpost} from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
 let Store = createStore(combineReducers({user:Authuser,post:Blogpost}),composeWithDevTools(applyMiddleware(thunk)));
export default Store;