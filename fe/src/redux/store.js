import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import pointReducer from "./reducers/pointReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  point: pointReducer,
});

const store = createStore(rootReducer);

export default store;
