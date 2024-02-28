// actions.js
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
  
  export const fetchAccountCode = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_ACCOUNT_CODE_REQUEST });
  
      try {
        const response = await fetch("https://crystalsolutions.com.pk/malikspicy/malikweb/GetAccount.php");
        if (!response.ok) {
          throw new Error("Failed to fetch account code data");
        }
        const data = await response.json();
        dispatch({ type: FETCH_ACCOUNT_CODE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_ACCOUNT_CODE_FAILURE, payload: error.message });
      }
    };
  };
  
  // Similarly, define thunk functions for fetching delivery and item data
  