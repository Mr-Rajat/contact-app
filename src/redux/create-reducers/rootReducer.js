import { combineReducers } from "redux";
import userLogin from "./userLogin";

const reducers = combineReducers({
    userAuth: userLogin,
})

export default reducers;