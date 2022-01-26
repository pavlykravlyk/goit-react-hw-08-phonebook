import { createSlice } from '@reduxjs/toolkit';
import { addUser, logIn, logOut, currentUser } from './auth-api';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
  },
  extraReducers: builder => {
    builder.addMatcher(addUser.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    });

    builder.addMatcher(logIn.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    });

    builder.addMatcher(logOut.matchFulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });

    builder.addMatcher(currentUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    });
  },
});
