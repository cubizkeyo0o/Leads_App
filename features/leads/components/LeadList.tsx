import React from 'react';
import { Button, FlatList, RefreshControl, Text, View } from 'react-native';
import { Lead } from '../leadsType';

interface LeadListProps {
  leads: Lead[];
  status: string;
  error: string | null;
  onRefresh: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, status, error, onRefresh, onEdit, onDelete }) => {
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={leads}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{item.name} ({item.status})</Text>
          <Text>{item.company}</Text>
          <Text>{item.phone}</Text>
          <Text>{item.email}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Button title="Edit" onPress={() => onEdit(item)} />
            <View style={{ width: 10 }} />
            <Button title="Delete" onPress={() => onDelete(item._id)} color="red" />
          </View>
        </View>
      )}
    />
  );
};

export default LeadList;