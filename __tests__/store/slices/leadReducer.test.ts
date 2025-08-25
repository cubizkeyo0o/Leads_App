import * as leadsApi from '@/features/leads/leadsApi';
import { addLead, editLead, LeadsState, removeLead } from '@/features/leads/leadsSlice';
import { Lead, LeadStatus } from '@/features/leads/leadsType';
import { AppStore, configStore } from '@/store';

interface RootState {
  leads: LeadsState;
}

jest.mock('@/features/leads/leadsApi');

const mockedCreateLead = leadsApi.createLead as jest.MockedFunction<typeof leadsApi.createLead>;
const mockedUpdateLead = leadsApi.updateLead as jest.MockedFunction<typeof leadsApi.updateLead>;
const mockedDeleteLead = leadsApi.deleteLead as jest.MockedFunction<typeof leadsApi.deleteLead>;

describe('leadReducer', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configStore()
  });

  test('should handle createLead', async () => {
    const mockedValue: Lead = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: LeadStatus.NEW,
      updatedAt: new Date().toISOString()
    };
    mockedCreateLead.mockResolvedValue(mockedValue)

    await store.dispatch(addLead(mockedValue));
    const state = (store.getState() as RootState).leads;
    
    expect(state.leads).toHaveLength(1);
    expect(state.leads[0]).toEqual(mockedValue);
    expect(state.error).toBeNull();
  });

  test('should handle updateLead and preserve unchanged fields', async () => {
    const mockedValue: Lead = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: LeadStatus.NEW,
      updatedAt: new Date().toISOString(),
    };

    // Add initial lead
    mockedCreateLead.mockResolvedValue(mockedValue);
    await store.dispatch(addLead(mockedValue));

    // Update with partial fields (not including phone)
    const updatedData: Partial<Lead> = {
      _id: '1',
      name: 'John Smith',
      email: 'johnsmith@example.com',
      updatedAt: new Date().toISOString(),
    };

    mockedUpdateLead.mockResolvedValue({
      ...mockedValue,
      ...updatedData,
    });

    await store.dispatch(editLead({ id: mockedValue._id!, updatedData }));

    const state = (store.getState() as RootState).leads;

    expect(state.leads[0].name).toBe('John Smith');
    expect(state.leads[0].email).toBe('johnsmith@example.com');
    expect(state.leads[0].phone).toBe('+1234567890');
    expect(state.leads[0].status).toBe(LeadStatus.NEW);
  });

  test('should handle deleteLead', async () => {
    const mockedValue: Lead = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: LeadStatus.NEW,
      updatedAt: new Date().toISOString()
    };
    mockedCreateLead.mockResolvedValue(mockedValue)
    await store.dispatch(addLead(mockedValue));
    expect((store.getState() as RootState).leads.leads).toHaveLength(1);

    mockedDeleteLead.mockResolvedValue(mockedValue._id)
    await store.dispatch(removeLead('1'));
    expect((store.getState() as RootState).leads.leads).toHaveLength(0);
  });

//   test('should handle setLeadStatus', () => {
//     const lead: Lead = {
//       _id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1234567890',
//       status: LeadStatus.NEW,
//       updatedAt: new Date().toISOString()
//     };

//     store.dispatch(addLead(lead));
//     store.dispatch(setLeadStatus({ id: '1', status: LeadStatus.CONTACTED }));
    
//     const state = (store.getState() as RootState).leads;
//     expect(state.leads[0].status).toBe(LeadStatus.CONTACTED);
//   });
});