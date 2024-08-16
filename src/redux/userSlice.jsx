import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { getUser, addUser, setToken, setStatus, setError } =
  userSlice.actions;

export default userSlice.reducer;
