import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';
import { LeadStatus } from '../leadsType';

interface StatusPickerProps {
  value: LeadStatus;
  onChange: (value: LeadStatus) => void;
}

export const StatusPicker: React.FC<StatusPickerProps> = ({ value, onChange }) => {
  return (
    <View>
      <Text>Status</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue as LeadStatus)}
      >
        <Picker.Item label="New" value={LeadStatus.NEW} />
        <Picker.Item label="Contacted" value={LeadStatus.CONTACTED} />
        <Picker.Item label="Qualified" value={LeadStatus.QUALIFIED} />
        <Picker.Item label="Won" value={LeadStatus.WON} />
        <Picker.Item label="Lost" value={LeadStatus.LOST} />
      </Picker>
    </View>
  );
};