import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import contactReducer from "./contactSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    contacts: contactReducer,
  },
});

export default store;
