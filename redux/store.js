import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './authReducer'; 
import postSlice from "./Post/postSlice";
import commentsSlice from './Comments/commentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postSlice,
  comments: commentsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;