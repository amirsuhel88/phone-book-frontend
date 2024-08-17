import { createSlice } from "@reduxjs/toolkit";
import EditContact from "../components/EditContact";

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
    editContact: (state, action) => {
      const index = state.contacts.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = {
          ...state.contacts[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { getContact, setStatus, setError, editContact } =
  contactSlice.actions;
export default contactSlice.reducer;
