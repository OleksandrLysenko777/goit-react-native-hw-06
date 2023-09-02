import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  stateChange: false,
  photo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      const { userId, userName, userEmail, photo } = action.payload;
      state.userId = userId;
      state.userName = userName;
      state.userEmail = userEmail;
      state.photo = photo;
    },

    authStateChange: (state, action) => {
      state.stateChange = action.payload.stateChange;
    },
    authSignOut: (state) => {
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.stateChange = false;
      state.photo = null;
    },
  },
});

export const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export default authSlice.reducer;
