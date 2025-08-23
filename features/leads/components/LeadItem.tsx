import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

interface LeadItemProps {
  lead: any;
}

const LeadItem: React.FC<LeadItemProps> = ({ lead }) => {
  const navigation = useNavigation();

  return (
    <View>
        <Text>{lead.name} - {lead.status} - Last update: {lead.lastUpdate}</Text>
        <Link href="/pages/LeadDetailRoute" />
      </View>
  );
};

export default LeadItem;