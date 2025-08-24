export type Note = {
 id: string; // maps to server _id
 leadId: string; // link to Lead.id
 body: string;
 updatedAt: string;
};