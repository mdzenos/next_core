import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '@/types';

interface ContactsState { items: Contact[]; }
const initialState: ContactsState = { items: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) { state.items = action.payload; },
    addContact(state, action: PayloadAction<Contact>) { state.items.push(action.payload); },
    updateContact(state, action: PayloadAction<Contact>) {
      const idx = state.items.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeContact(state, action: PayloadAction<string>) {
      state.items = state.items.filter(c => c.id !== action.payload);
    }
  }
});

export const { setContacts, addContact, updateContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
