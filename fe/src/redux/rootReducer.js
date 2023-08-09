import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    // 다른 리듀서들 추가하기
  });

export default rootReducer;