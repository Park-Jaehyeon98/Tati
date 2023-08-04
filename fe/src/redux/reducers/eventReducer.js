// // src/redux/reducers/eventsReducer.js

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default eventsReducer
// import { createSlice } from '@reduxjs/toolkit'

// const eventSlice = createSlice({
//   nsme: 'event',
//   initialSatate
// })