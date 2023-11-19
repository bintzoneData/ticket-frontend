import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketSlice from '../features/tickets/ticketSlice';
import authMix from '../features/mix/authMix';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketSlice,
    categories: authMix,
    items: authMix,
  },
});
