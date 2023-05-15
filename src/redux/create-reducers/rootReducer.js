import { combineReducers } from "redux";
import userLogin from "./userLogin";
import userContact from "./userContact";

const reducers = combineReducers({
    userAuth: userLogin,
    userData: userContact,
})

export default reducers;