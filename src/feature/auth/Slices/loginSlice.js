import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../Core/url";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  role: localStorage.getItem("role") || null,
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    // console.log(formData, "formData");

    try {
      const response = await API.post("/auth/login", formData);
      console.log("LoginSlice response:", response);
      return response.data;
    } catch (error) {
      console.log("LoginSlice error:", error?.response?.data);
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const tokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("token", action.payload.token);

        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { logout } = tokenSlice.actions;
export default tokenSlice.reducer;
