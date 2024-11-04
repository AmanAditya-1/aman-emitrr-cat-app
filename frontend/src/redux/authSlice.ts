import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../config";

interface AuthState {
  username: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: "",
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (username: string) => {
    localStorage.setItem("username", username);
    return username;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
