import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    signInFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    updateUsertart: (state) => {
      state.loading = true;
    },
    updateUsersuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserstart: (state) => {
      state.loading = true;
    },
    deleteUsersuccess: (state, action) => {
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutstart: (state) => {
      state.loading = true;
    },
    signOutsuccess: (state, action) => {
      state.currentUser = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUsersuccess,
  updateUsertart,
  deleteUserFailure,
  deleteUsersuccess,
  deleteUserstart,
  signOutFailure,
  signOutstart,
  signOutsuccess
} = userSlice.actions;

export default userSlice.reducer;
