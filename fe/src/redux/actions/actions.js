// actions.js
export const setUserInfo = (userData) => ({
  type: 'SET_USER_INFO',
  payload: userData,
});

export const SET_MEMBER_POINT = "SET_MEMBER_POINT";

export const setMemberPoint = (point) => {
  return {
    type: SET_MEMBER_POINT,
    payload: point,
  };
};

export const addEvent = (event) => ({
  type: 'ADD_EVENT',
  payload: event,
});