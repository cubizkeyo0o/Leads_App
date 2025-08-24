import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Lead } from '../leadsType';

interface LeadItemProps {
  lead: Lead;
}

const LeadItem: React.FC<LeadItemProps> = ({ lead }) => {
  const navigation = useNavigation();

  return (
    <View>
        <Text>{lead.name} - {lead.email} - {lead.phone} - Last update: {lead.updatedAt}</Text>
        {/* <Button onPress={() => navigation.navigate('')}/> */}
      </View>
  );
};

export default LeadItem;