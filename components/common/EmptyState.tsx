import React from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  entity: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({entity}) => {
  return <View><Text>No {entity} found.</Text></View>;
};

export default EmptyState;