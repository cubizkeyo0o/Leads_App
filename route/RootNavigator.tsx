import LeadDetailsScreen from '@/features/leads/components/LeadDetailScreen';
import { LeadsScreen } from '@/features/leads/components/LeadsScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from './Type';

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'LeadsScreen',
  screens: {
    LeadsScreen: LeadsScreen,
    LeadDetailsScreen: LeadDetailsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function RootNavigator() {
  return (
      <Navigation />
  );
}