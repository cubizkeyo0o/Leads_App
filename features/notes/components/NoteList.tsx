import React from 'react';
import { Text } from 'react-native';

interface NoteListProps {
  leadId: string;
}

const NoteList: React.FC<NoteListProps> = ({ leadId }) => {
  // Use selector to get notes for leadId
  return <Text>This is contain note list</Text>;
};

export default NoteList;