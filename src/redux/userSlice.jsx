import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      return response.data.token; // Return the token to be used in the slice
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data.message : "Login failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      }));
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null; // Clear the token from the state
      localStorage.removeItem("token"); // Clear the token from localStorage
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { getUser, addUser, setToken, setStatus, setError, logout } =
  userSlice.actions;

export default userSlice.reducer;
