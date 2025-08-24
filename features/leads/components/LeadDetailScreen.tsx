import { useAppDispatch, useAppSelector } from '@/features/hook';
import { getNotes } from '@/features/notes/notesSlice';
import { RootStackParamList } from '@/route/Type';
import { RootState } from '@/store';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import LeadDetails from './LeadsDetail';

type LeadDetailsRouteProp = RouteProp<RootStackParamList, "LeadDetailsScreen">;

type Props = {
  route: LeadDetailsRouteProp;
};

const LeadDetailsScreen: React.FC<Props> = ({route }) => {
  const { leadId } = route.params;
  const dispatch = useAppDispatch();
  const lead = useAppSelector((state: RootState) => state.leads.leads.find(l => l._id === leadId));

  useEffect(() => {
    if (leadId) dispatch(getNotes(leadId));
  }, [dispatch, leadId]);

  return lead ? <LeadDetails lead={lead} /> : <View><Text>Loading...</Text></View>;
};

export default LeadDetailsScreen;