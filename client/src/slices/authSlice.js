import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
};

const authSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.auth = action.payload.token
      localStorage.setItem('authToken', JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
