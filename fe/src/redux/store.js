import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import pointReducer from "./reducers/pointReducer"
import eventsReducer from "./reducers/eventReducer";
import studyReducer from "./reducers/studylistReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  point: pointReducer,
  events: eventsReducer,
  // study: studyReducer,
});

const store = createStore(rootReducer);

export default store;
