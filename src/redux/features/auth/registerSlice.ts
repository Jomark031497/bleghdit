import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "../../../types";

interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}

const initialState: ReduxState = {
  data: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk("user/register", async (payload: RegisterPayload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/register", payload);

    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.data = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default registerSlice.reducer;
