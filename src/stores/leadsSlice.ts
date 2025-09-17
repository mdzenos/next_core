import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Lead } from '@/types';

interface LeadsState { items: Lead[]; }
const initialState: LeadsState = { items: [] };

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads(state, action: PayloadAction<Lead[]>) { state.items = action.payload; },
    addLead(state, action: PayloadAction<Lead>) { state.items.push(action.payload); },
    updateLead(state, action: PayloadAction<Lead>) {
      const idx = state.items.findIndex(l => l.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeLead(state, action: PayloadAction<string>) {
      state.items = state.items.filter(l => l.id !== action.payload);
    }
  }
});

export const { setLeads, addLead, updateLead, removeLead } = leadsSlice.actions;
export default leadsSlice.reducer;
