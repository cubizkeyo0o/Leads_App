import NoteForm from '@/features/notes/components/NoteForm';
import NoteList from '@/features/notes/components/NoteList';
import React from 'react';
import { View } from 'react-native';

interface LeadDetailsProps {
  lead: any;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead }) => {
  return (
    <View>
      {/* Lead info */}
      <NoteList leadId={lead._id} />
      <NoteForm leadId={lead._id} />
    </View>
  );
};

export default LeadDetails;