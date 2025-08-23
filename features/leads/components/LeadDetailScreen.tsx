import { getNotes } from '@/features/notes/notesSlice';
import { AppDispatch, RootState } from '@/store';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LeadDetails from './LeadsDetail';

type LeadDetailsScreenRouteProp = RouteProp<{ params: { leadId: string } }, 'params'>;

interface LeadDetailsScreenProps {
  route: LeadDetailsScreenRouteProp;
}

const LeadDetailsScreen: React.FC<LeadDetailsScreenProps> = ({ route }) => {
  const { leadId } = route.params;
  const dispatch: AppDispatch = useDispatch();
  const lead = useSelector((state: RootState) => state.leads.leads.find(l => l._id === leadId));

  useEffect(() => {
    if (leadId) dispatch(getNotes(leadId));
  }, [dispatch, leadId]);

  return lead ? <LeadDetails lead={lead} /> : <View><Text>Loading...</Text></View>;
};

export default LeadDetailsScreen;