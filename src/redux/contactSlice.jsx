import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getContact: (state, action) => {
      state.contacts = action.payload.map((contact) => {
        return {
          id: contact.id,
          userId: contact.userId,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          photo: contact.photo,
        };
      });
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getContact, setStatus, setError } = contactSlice.actions;
export default contactSlice.reducer;
