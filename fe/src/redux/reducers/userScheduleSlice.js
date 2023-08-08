import { createSlice } from '@reduxjs/toolkit';

const userScheduleSlice = createSlice({
  name: 'userSchedule', // 슬라이스의 이름
  initialState: [], // 초기 상태
  reducers: {

    addSchedule: (state, action) => {
      state.push(action.payload); // 스케줄 추가
    },
    
    removeSchedule: (state, action) => {
      return state.filter(schedule => schedule.id !== action.payload); // 스케줄 삭제
    },

    updateSchedule: (state, action) => {
      const { id, updatedData } = action.payload;
      const scheduleToUpdate = state.find(schedule => schedule.id === id);
      if (scheduleToUpdate) {
        Object.assign(scheduleToUpdate, updatedData); // 스케줄 업데이트
      }
    },
  },
});

export const { addSchedule, removeSchedule, updateSchedule } = userScheduleSlice.actions;

export default userScheduleSlice.reducer;
