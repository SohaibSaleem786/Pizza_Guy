// navbarActions.js
import * as types from './navbarActionTypes';

export const setMenuItems = (menuItems) => ({
  type: types.SET_MENU_ITEMS,
  payload: menuItems,
});
