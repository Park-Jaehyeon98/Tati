// src/redux/reducers/eventsReducer.js

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default eventsReducer;
