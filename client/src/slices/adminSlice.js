import { createSlice } from '@reduxjs/toolkit';

// Check local storage for initial authentication state
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { login, logout } = adminSlice.actions;

export const selectIsAuthenticated = (state) => state.admin.isAuthenticated;

export default adminSlice.reducer;
