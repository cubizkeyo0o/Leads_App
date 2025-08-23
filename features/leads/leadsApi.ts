import api from "@/services/api";

export const fetchLeads = async () => {
  const response = await api.get('/leads');
  return response.data;
};

export const createLead = async (lead: any) => {
  const response = await api.post('/leads', lead);
  return response.data;
};

export const updateLead = async ({ id, ...lead }: { id: string; [key: string]: any }) => {
  const response = await api.put(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id: string) => {
  await api.delete(`/leads/${id}`);
  return id;
};