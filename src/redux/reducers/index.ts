import { combineReducers } from "redux";
import GlobalReducer from "./GlobalReducer";

const rootReducer = combineReducers({
  globalReducer: GlobalReducer
});

export default rootReducer;
