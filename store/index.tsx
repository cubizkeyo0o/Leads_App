import leadsReducer from '@/features/leads/leadsSlice';
import notesReducer from '@/features/notes/notesSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    leads: leadsReducer,
    notes: notesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;