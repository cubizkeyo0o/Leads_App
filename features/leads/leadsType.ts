export type Lead = {
 _id: string; // maps to server _id
 name: string;
 status: LeadStatus;
 company?: string;
 phone?: string;
 email?: string;
 updatedAt: string; // ISO, used for LWW conflicts
};

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  WON = 'won',
  LOST = 'lost',
}