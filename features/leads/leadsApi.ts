import mainAxios from "@/services/api";

export const fetchLeads = async () => {
  const response = await mainAxios.get('/leads');
  return response.data;
};

export const createLead = async (lead: any) => {
  const response = await mainAxios.post('/leads', lead);
  return response.data;
};

export const updateLead = async ({ id, ...lead }: { id: string; [key: string]: any }) => {
  const response = await mainAxios.put(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id: string) => {
  await mainAxios.delete(`/leads/${id}`);
  return id;
};