import api from '../../services/api';

export const fetchNotes = async (leadId: string) => {
  const response = await api.get(`/notes?leadId=${leadId}`);
  return { leadId, notes: response.data };
};

export const addNote = async ({ leadId, note }: { leadId: string; note: any }) => {
  const response = await api.post('/notes', { leadId, ...note });
  return { leadId, note: response.data };
};