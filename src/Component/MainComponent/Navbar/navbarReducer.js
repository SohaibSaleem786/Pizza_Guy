// navbarReducer.js
import * as types from './navbarActionTypes';

const initialState = {
  menuItems: [],
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
      };
    default:
      return state;
  }
};

export default navbarReducer;
