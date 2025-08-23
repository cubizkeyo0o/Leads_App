import React from 'react';
import { View } from 'react-native';

interface NoteFormProps {
  leadId: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ leadId }) => {
  // Form to add note
  return <View>{/* TextInput and Button */}</View>;
};

export default NoteForm;