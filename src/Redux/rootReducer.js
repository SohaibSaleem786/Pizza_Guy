// rootReducer.js
import { combineReducers } from 'redux';
import {
  FETCH_ACCOUNT_CODE_REQUEST,
  FETCH_ACCOUNT_CODE_SUCCESS,
  FETCH_ACCOUNT_CODE_FAILURE,
  FETCH_DELIVERY_REQUEST,
  FETCH_DELIVERY_SUCCESS,
  FETCH_DELIVERY_FAILURE, 
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
} from './Action';

// Initial state structure for reducers
const initialState = { loading: false, data: null, error: null };

// Reducer for account code data
const accountCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ACCOUNT_CODE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ACCOUNT_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for delivery data
const deliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELIVERY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DELIVERY_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_DELIVERY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for item data
const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ITEM_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Combine all reducers into rootReducer
const rootReducer = combineReducers({
  accountCode: accountCodeReducer,
  delivery: deliveryReducer,
  item: itemReducer,
  // Add other reducers here if needed
});

export default rootReducer;
