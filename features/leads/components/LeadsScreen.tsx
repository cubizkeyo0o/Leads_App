import { useAppDispatch, useAppSelector } from '@/features/hook';
import { addToQueue } from '@/services/offlineManager';
import { RootState } from '@/store';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addLead, editLead, getLeads, removeLead } from '../leadsSlice';
import { Lead } from '../leadsType';
import LeadForm from './LeadForm';
import LeadList from './LeadList';

export function LeadsScreen() {
  const dispatch = useAppDispatch();
  const { leads, status, error } = useAppSelector((state: RootState) => state.leads);
  const [refreshing, setRefreshing] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getLeads());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getLeads()).then(() => setRefreshing(false));
  };

  const handleAddNew = () => {
    setEditingLead(null); // clear edit mode
    setShowForm(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLead(null);
  };

  const handleSubmit = async (values: Omit<Lead, '_id' | 'updatedAt'>, editingId?: string) => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      if (editingId) {
        dispatch(editLead({ id: editingId, ...values }));
        setEditingLead(null);
      } else {
        dispatch(addLead(values));
      }
    } else {
      await addToQueue("lead", { type: "add", data: values, apiUrl: "/leads" });
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    dispatch(removeLead(id))
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showForm ? (
        <LeadForm
          initialValues={editingLead || undefined}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancel}
          onCancelAddNew={handleCancel}
        />
      ) : (
        <>
          <Button title="Add Lead" onPress={handleAddNew} />
          <LeadList
            leads={leads}
            status={status}
            error={error}
            onRefresh={onRefresh}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </SafeAreaView>
  );
}