// actions.js

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
export const SET_SELECTED_ROW = 'SET_SELECTED_ROW';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setFilterValue = (value) => ({
  type: SET_FILTER_VALUE,
  payload: value,
});

export const setSelectedRow = (row) => ({
  type: SET_SELECTED_ROW,
  payload: row,
});
