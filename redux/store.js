import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './authReducer'; 
import postReducer from "./Post/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;