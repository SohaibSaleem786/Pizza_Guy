// actions.js
import { fetchDataAccountCode, fetchDataDelivery, fetchDataItem ,fetchDataCategory , fetchDataUOM ,
  fetchDataLocation,fetchDataMOP ,fetchDataWaiter, fetchDataTable, fetchDataKitchenList,
  fetchDataPendingOrderList,
  fetchDataDiningOrderList,
  fetchDataCarOrderList,
  fetchDataDiliveryOrderList,
} from './api';
export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';

export const FETCH_ACCOUNT_CODE_REQUEST = 'FETCH_ACCOUNT_CODE_REQUEST';
export const FETCH_ACCOUNT_CODE_SUCCESS = 'FETCH_ACCOUNT_CODE_SUCCESS';
export const FETCH_ACCOUNT_CODE_FAILURE = 'FETCH_ACCOUNT_CODE_FAILURE';



export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';

export const setMenuItems = (menuItems) => ({
  type: SET_MENU_ITEMS,
  payload: menuItems,
});

export const fetchAccountCode = () => async dispatch => {
  dispatch({ type: FETCH_ACCOUNT_CODE_REQUEST });
  try {
    const data = await fetchDataAccountCode();
    dispatch({ type: FETCH_ACCOUNT_CODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ACCOUNT_CODE_FAILURE, payload: error.message });
  }
};



export const FETCH_DELIVERY_REQUEST = 'FETCH_DELIVERY_REQUEST';
export const FETCH_DELIVERY_SUCCESS = 'FETCH_DELIVERY_SUCCESS';
export const FETCH_DELIVERY_FAILURE = 'FETCH_DELIVERY_FAILURE';
export const fetchDelivery = () => async dispatch => {
  dispatch({ type: FETCH_DELIVERY_REQUEST });
  try {
    const data = await fetchDataDelivery();
    dispatch({ type: FETCH_DELIVERY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DELIVERY_FAILURE, payload: error.message });
  }
};

export const fetchItem = () => async dispatch => {
  dispatch({ type: FETCH_ITEM_REQUEST });
  try {
    const data = await fetchDataItem();
    dispatch({ type: FETCH_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ITEM_FAILURE, payload: error.message });
  }
};

export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const fetchCategory = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORY_REQUEST });
  try {
    const data = await fetchDataCategory();
    dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_FAILURE, payload: error.message });
  }
};


export const FETCH_UOM_REQUEST = 'FETCH_UOM_REQUEST';
export const FETCH_UOM_SUCCESS = 'FETCH_UOM_SUCCESS';
export const FETCH_UOM_FAILURE = 'FETCH_UOM_FAILURE';

export const fetchUOM = () => async dispatch => {
  dispatch({ type: FETCH_UOM_REQUEST });
  try {
    const data = await fetchDataUOM();
    dispatch({ type: FETCH_UOM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_UOM_FAILURE, payload: error.message });
  }
};



export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';

export const fetchLocation = () => async dispatch => {
  dispatch({ type: FETCH_LOCATION_REQUEST });
  try {
    const data = await fetchDataLocation();
    dispatch({ type: FETCH_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_LOCATION_FAILURE, payload: error.message });
  }
};




export const FETCH_MOP_REQUEST = 'FETCH_MOP_REQUEST';
export const FETCH_MOP_SUCCESS = 'FETCH_MOP_SUCCESS';
export const FETCH_MOP_FAILURE = 'FETCH_MOP_FAILURE';

export const fetchMOP = () => async dispatch => {
  dispatch({ type: FETCH_MOP_REQUEST });
  try {
    const data = await fetchDataMOP();
    dispatch({ type: FETCH_MOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MOP_FAILURE, payload: error.message });
  }
};



export const FETCH_WAITER_REQUEST = 'FETCH_WAITER_REQUEST';
export const FETCH_WAITER_SUCCESS = 'FETCH_WAITER_SUCCESS';
export const FETCH_WAITER_FAILURE = 'FETCH_WAITER_FAILURE';

export const fetchWaiter = () => async dispatch => {
  dispatch({ type: FETCH_MOP_REQUEST });
  try {
    const data = await fetchDataWaiter();
    dispatch({ type: FETCH_WAITER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_WAITER_FAILURE, payload: error.message });
  }
};


export const FETCH_TABLE_REQUEST = 'FETCH_TABLE_REQUEST';
export const FETCH_TABLE_SUCCESS = 'FETCH_TABLE_SUCCESS';
export const FETCH_TABLE_FAILURE = 'FETCH_TABLE_FAILURE';

export const fetchTable = () => async dispatch => {
  dispatch({ type: FETCH_TABLE_REQUEST });
  try {
    const data = await fetchDataTable();
    dispatch({ type: FETCH_TABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TABLE_FAILURE, payload: error.message });
  }
};


export const FETCH_KITCHEN_REQUEST = 'FETCH_KITCHEN_REQUEST';
export const FETCH_KITCHEN_SUCCESS = 'FETCH_KITCHEN_SUCCESS';
export const FETCH_KITCHEN_FAILURE = 'FETCH_KITCHEN_FAILURE';
export const UPDATE_KITCHEN_DATA = 'UPDATE_KITCHEN_DATA';

export const fetchKitchen = () => async dispatch => {
  dispatch({ type: FETCH_KITCHEN_REQUEST });
  try {
    const data = await fetchDataKitchenList();
    dispatch({ type: FETCH_KITCHEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_KITCHEN_FAILURE, payload: error.message });
  }
};

export const updateKitchenData = () => ({
  type: UPDATE_KITCHEN_DATA,
});




export const FETCH_PENDINGORDERLIST_REQUEST = 'FETCH_PENDINGORDERLIST_REQUEST';
export const FETCH_PENDINGORDERLIST_SUCCESS = 'FETCH_PENDINGORDERLIST_SUCCESS';
export const FETCH_PENDINGORDERLIST_FAILURE = 'FETCH_PENDINGORDERLIST_FAILURE';

export const fetchPendingOrderlist = () => async dispatch => {
  dispatch({ type: FETCH_PENDINGORDERLIST_REQUEST });
  try {
    const data = await fetchDataPendingOrderList();
    dispatch({ type: FETCH_PENDINGORDERLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PENDINGORDERLIST_FAILURE, payload: error.message });
  }
};



export const FETCH_DININGORDERLIST_REQUEST = 'FETCH_DININGORDERLIST_REQUEST';
export const FETCH_DININGORDERLIST_SUCCESS = 'FETCH_DININGORDERLIST_SUCCESS';
export const FETCH_DININGORDERLIST_FAILURE = 'FETCH_DININGORDERLIST_FAILURE';

export const fetchDiningOrderList = () => async dispatch => {
  dispatch({ type: FETCH_DININGORDERLIST_REQUEST });
  try {
    const data = await fetchDataDiningOrderList();
    dispatch({ type: FETCH_DININGORDERLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DININGORDERLIST_FAILURE, payload: error.message });
  }
};





export const FETCH_CARORDERLIST_REQUEST = 'FETCH_CARORDERLIST_REQUEST';
export const FETCH_CARORDERLIST_SUCCESS = 'FETCH_CARORDERLIST_SUCCESS';
export const FETCH_CARORDERLIST_FAILURE = 'FETCH_CARORDERLIST_FAILURE';

export const fetchCarOrderList = () => async dispatch => {
  dispatch({ type: FETCH_CARORDERLIST_REQUEST });
  try {
    const data = await fetchDataCarOrderList();
    dispatch({ type: FETCH_CARORDERLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CARORDERLIST_FAILURE, payload: error.message });
  }
};


export const FETCH_DELIVERYORDERLIST_REQUEST = 'FETCH_DELIVERYORDERLIST_REQUEST';
export const FETCH_DELIVERYORDERLIST_SUCCESS = 'FETCH_DELIVERYORDERLIST_SUCCESS';
export const FETCH_DELIVERYORDERLIST_FAILURE = 'FETCH_DELIVERYORDERLIST_FAILURE';

export const fetchDeliveryOrderList = () => async dispatch => {
  dispatch({ type: FETCH_DELIVERYORDERLIST_REQUEST });
  try {
    const data = await fetchDataDiliveryOrderList();
    dispatch({ type: FETCH_DELIVERYORDERLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DELIVERYORDERLIST_FAILURE, payload: error.message });
  }
};