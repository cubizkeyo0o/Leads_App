import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNote, fetchNotes } from './notesApi';

interface NotesState {
  notes: { [leadId: string]: any[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  notes: {},
  status: 'idle',
  error: null,
};

export const getNotes = createAsyncThunk('notes/getNotes', fetchNotes);
export const createNote = createAsyncThunk('notes/createNote', addNote);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending, fulfilled, rejected for each thunk
  },
});

export default notesSlice.reducer;