import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 로컬 스토리지 사용


import userSlice from './reducers/userSlice';
import userScheduleSlice from './reducers/userScheduleSlice';
import userStudyScheduleSlice from './reducers/userStudyScheduleSlice';


// 로컬로 저장
const persistConfig = {
  key: 'user', // 저장될 데이터의 키 (유저 정보만 저장)
  storage, // 스토리지 종류 (로컬 스토리지)
  whitelist: ['userInfo'], // 유저 정보만 저장할 수 있도록 설정
};
const persistedReducer = persistReducer(persistConfig, userSlice);


// 새로고침시 삭제됨
const store = configureStore({
  reducer: {
    user: persistedReducer,
    schedule:userScheduleSlice,
    userStudySchedule:userStudyScheduleSlice
  },
});

const persistor = persistStore(store);

export { store, persistor };