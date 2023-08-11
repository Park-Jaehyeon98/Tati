import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers:{
    setUser: (state, action) => {
      return action.payload; // action에서 받은 유저 정보로 상태를 업데이트
    },
    updateUser: (state, action) => { // Corrected action name
      const updatedData = action.payload; // Assuming the payload is an object with updated data
      return {
        ...state,
        ...updatedData // Merge the updated data with the current state
      };
    },
    clearUser: () => null, // 로그아웃 시 상태를 초기화
  }
})

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;