import React from 'react';
import { Text, View } from 'react-native';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return <View><Text>Error: {message}</Text></View>;
};

export default ErrorState;