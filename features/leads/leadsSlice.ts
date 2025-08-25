import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createLead, deleteLead, fetchLeads, updateLead } from './leadsApi';
import { Lead } from './leadsType';

export interface LeadsState {
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
    builder
       // Get Leads
      .addCase(getLeads.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.status = 'succeeded';
        state.leads = action.payload;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch leads';
      })

      // Add Lead
      .addCase(addLead.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.status = 'succeeded';
        state.leads.push(action.payload);
      })
      .addCase(addLead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add lead';
      })

      // Edit Lead
      .addCase(editLead.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.status = 'succeeded';
        const index = state.leads.findIndex(l => l._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(editLead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to edit lead';
      })

      // Remove Lead
      .addCase(removeLead.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeLead.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.leads = state.leads.filter(l => l._id !== action.payload);
      })
      .addCase(removeLead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete lead';
      });
  },
});

export default leadsSlice.reducer;