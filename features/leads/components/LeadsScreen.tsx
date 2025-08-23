import { AppDispatch, RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addLead, getLeads } from '../leadsSlice';
import LeadForm from './LeadForm';
import LeadList from './LeadList';

const LeadsScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { leads, status, error } = useSelector((state: RootState) => state.leads);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getLeads()).then(() => setRefreshing(false));
  };

  return (
    <View>
      <LeadForm onSubmit={(values) => dispatch(addLead(values))} />
      <LeadList leads={leads} status={status} error={error} onRefresh={onRefresh} />
    </View>
  );
};

export default LeadsScreen;