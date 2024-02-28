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
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_UOM_REQUEST,
  FETCH_UOM_SUCCESS,
  FETCH_UOM_FAILURE,
  SET_MENU_ITEMS,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
  FETCH_MOP_REQUEST,
  FETCH_MOP_SUCCESS,
  FETCH_MOP_FAILURE,
  FETCH_WAITER_REQUEST,
  FETCH_WAITER_SUCCESS,
  FETCH_WAITER_FAILURE,
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,
  FETCH_KITCHEN_REQUEST,
  FETCH_KITCHEN_SUCCESS,
  FETCH_KITCHEN_FAILURE,
  UPDATE_KITCHEN_DATA,
  FETCH_PENDINGORDERLIST_REQUEST,
  FETCH_PENDINGORDERLIST_SUCCESS,
  FETCH_PENDINGORDERLIST_FAILURE,
  FETCH_DININGORDERLIST_REQUEST,
  FETCH_DININGORDERLIST_SUCCESS,
  FETCH_DININGORDERLIST_FAILURE,
  FETCH_CARORDERLIST_REQUEST,
  FETCH_CARORDERLIST_SUCCESS,
  FETCH_CARORDERLIST_FAILURE,
  FETCH_DELIVERYORDERLIST_REQUEST,
  FETCH_DELIVERYORDERLIST_SUCCESS,
  FETCH_DELIVERYORDERLIST_FAILURE,


 } from './Action';

const accountCodeReducer = (state = { loading: false, data: null, error: null }, action) => {
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

const deliveryReducer = (state = { loading: false, data: null, error: null }, action) => {
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

const itemReducer = (state = { loading: false, data: null, error: null }, action) => {
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


const categoryReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORY_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const initialState = {
  menuItems: [],
};



const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
      };
    default:
      return state;
  }
};

const UOMReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_UOM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_UOM_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_UOM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const locationReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LOCATION_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const MOPReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_MOP_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOP_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_MOP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const WaiterReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_WAITER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_WAITER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_WAITER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const TableReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_TABLE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TABLE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_TABLE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const PendingOrderListReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_PENDINGORDERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PENDINGORDERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_PENDINGORDERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const DiningOrderListReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_DININGORDERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DININGORDERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_DININGORDERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const CarOrderListReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_CARORDERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CARORDERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CARORDERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const DeliveryOrderListReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_DELIVERYORDERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DELIVERYORDERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_DELIVERYORDERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const KitchenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITCHEN_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_KITCHEN_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_KITCHEN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_KITCHEN_DATA:

      return { ...state, data: action.payload }; 
    default:
      return state;
  }
};

// export default kitchenReducer;



const rootReducer = combineReducers({
  accountCode: accountCodeReducer,
  delivery: deliveryReducer,
  item: itemReducer,
  category: categoryReducer,
  menuItems: navbarReducer,
  uom: UOMReducer,
  location: locationReducer,
  mop: MOPReducer,
  waiter : WaiterReducer,
  table : TableReducer,
  kitchen : KitchenReducer,
  pendingOrderList : PendingOrderListReducer,
  diningOrderList : DiningOrderListReducer,
  carOrderList : CarOrderListReducer,
  deliveryOrderList : DeliveryOrderListReducer,
});

export default rootReducer;
