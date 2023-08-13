import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import userScheduleSlice from './reducers/userScheduleSlice';
import faqSlice from './reducers/faqSlice'

const rootReducer = combineReducers({
    user: userSlice,
    userSchedule: userScheduleSlice,
    faq:faqSlice,
    // 다른 리듀서들 추가하기
  });

export default rootReducer;