import { createStore, applyMiddleware } from 'redux';
import {thunk } from 'redux-thunk';
import rootReducer from './Redux/Reducer';// assuming you have defined your reducers

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;