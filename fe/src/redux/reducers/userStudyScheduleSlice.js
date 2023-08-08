import { createSlice } from '@reduxjs/toolkit';

const userStudyScheduleSlice = createSlice({
  name: 'userStudySchedule', // 슬라이스의 이름
  initialState: [], // 초기 상태
  reducers: {

    addStudySchedule: (state, action) => {
      state.push(action.payload); // 스케줄 추가
    },
    
    removeStudySchedule: (state, action) => {
      return state.filter(schedule => schedule.id !== action.payload); // 스케줄 삭제
    },

    updateStudySchedule: (state, action) => {
      const { id, updatedData } = action.payload;
      const scheduleToUpdate = state.find(schedule => schedule.id === id);
      if (scheduleToUpdate) {
        Object.assign(scheduleToUpdate, updatedData); // 스케줄 업데이트
      }
    },
    clearUserStudySchedule: (state, action) => {
      return []; // 배열을 비우는 처리
    },
  },
});

export const { addStudySchedule, removeStudySchedule, updateStudySchedule, clearUserStudySchedule } = userStudyScheduleSlice.actions;

export default userStudyScheduleSlice.reducer;
