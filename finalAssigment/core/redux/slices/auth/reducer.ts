/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { addUser, editUser, deleteUser } from "@/core/redux/slices/auth";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    })
    .addCase(editUser, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    })
    .addCase(deleteUser, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
});

export default authReducer;
