import {SET_MEMBER_POINT} from '../actions/actions'

const initialState = {
    memberPoint: null,
  };
  
  const pointReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MEMBER_POINT:
        return {
          ...state,
          memberPoint: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pointReducer;