// reducers.js

import { combineReducers } from 'redux';

export const initialState = {
  categories: [],
  filterValue: '',
  selectedRow: null,
};

export const categoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.payload;
    default:
      return state;
  }
};

export const filterValueReducer = (state = initialState.filterValue, action) => {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return action.payload;
    default:
      return state;
  }
};

export const selectedRowReducer = (state = initialState.selectedRow, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ROW':
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  filterValue: filterValueReducer,
  selectedRow: selectedRowReducer,
});
