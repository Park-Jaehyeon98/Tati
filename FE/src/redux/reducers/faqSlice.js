import { createSlice } from '@reduxjs/toolkit';

const faqSlice = createSlice({
  name: 'faq',
  initialState: [],
  reducers: {
    addFaq: (state, action) => {
      state.push(action.payload);
    },
    deleteFaq: (state, action) => {
      return state.filter(faq => faq.id !== action.payload);
    },
    updateFaq: (state, action) => {
      const { id, updatedFaq } = action.payload;
      const index = state.findIndex(faq => faq.id === id);
      if (index !== -1) {
        state[index] = updatedFaq;
      }
    },
    resetFaq: (state) => {
      return [];
    },
  },
});

export const { addFaq, deleteFaq, updateFaq, resetFaq } = faqSlice.actions;

export default faqSlice.reducer;
