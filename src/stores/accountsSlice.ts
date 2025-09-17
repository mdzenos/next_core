import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Account } from '@/types';

interface AccountsState { items: Account[]; }
const initialState: AccountsState = { items: [] };

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) { state.items = action.payload; },
    addAccount(state, action: PayloadAction<Account>) { state.items.push(action.payload); },
    updateAccount(state, action: PayloadAction<Account>) {
      const idx = state.items.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.items = state.items.filter(a => a.id !== action.payload);
    }
  }
});

export const { setAccounts, addAccount, updateAccount, removeAccount } = accountsSlice.actions;
export default accountsSlice.reducer;
