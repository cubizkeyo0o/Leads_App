import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createLead, deleteLead, fetchLeads, updateLead } from './leadsApi';

interface Lead {
  _id: string;
  name: string;
  status: string;
  lastUpdate: string;
}

interface LeadsState {
  leads: Lead[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  status: 'idle',
  error: null,
};

export const getLeads = createAsyncThunk('leads/getLeads', fetchLeads);
export const addLead = createAsyncThunk('leads/addLead', createLead);
export const editLead = createAsyncThunk('leads/editLead', updateLead);
export const removeLead = createAsyncThunk('leads/removeLead', deleteLead);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending, fulfilled, rejected for each thunk
  },
});

export default leadsSlice.reducer;