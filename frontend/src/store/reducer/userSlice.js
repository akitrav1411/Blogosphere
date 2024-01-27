import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";
export const saveUsertodb = createAsyncThunk(
  "User/saveUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiCalling("post", "/signup", payload);
      toast.success("User saved successfully");
      return res;
    } catch (err) {
      const { response } = err;
      const { data } = response || {};
      toast.error(data || "Something went wrong!");
      console.log(data);
      return rejectWithValue(err);
    }
  }
);
export const login = createAsyncThunk(
  "User/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiCalling("post", "/login", payload);
      toast.success("Logged in successfully");
      return res;
    } catch (err) {
      toast.error(err?.message || "Something went wrong, try again!");
      return rejectWithValue(err);
    }
  }
);
const userSlice = createSlice({
  name: "User",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")),
    isAdmin: false,
    loading: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUsertodb.fulfilled, (state, action) => {
      state.loading = false;
      const { payload } = action;
      state.user = payload;
      sessionStorage.setItem("user", JSON.stringify(payload));
    });
    builder.addCase(saveUsertodb.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveUsertodb.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const { payload } = action;
      state.user = payload;
      sessionStorage.setItem("user", JSON.stringify(payload));
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { clearUser } = userSlice.actions;
