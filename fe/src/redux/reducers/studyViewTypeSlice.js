import { createSlice } from "@reduxjs/toolkit";

export const studyViewTypeSlice = createSlice({
  name: "studyViewType",
  initialState: { studyViewType: 0 },
  reducers: {
    setStudyViewType: (state, action) => {
      state.studyViewType = action.payload; //
    },
  },
});

export const { setStudyViewType } = studyViewTypeSlice.actions;

export default studyViewTypeSlice.reducer;
