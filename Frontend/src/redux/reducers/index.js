import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";
import { friendReducer } from "./friendReducer"
export const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  friend: friendReducer,
});
