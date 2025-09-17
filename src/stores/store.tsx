'use client';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import leadsReducer from './leadsSlice';
import contactsReducer from './contactsSlice';
import accountsReducer from './accountsSlice';

export const store = configureStore({
  reducer: { leads: leadsReducer, contacts: contactsReducer, accounts: accountsReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
