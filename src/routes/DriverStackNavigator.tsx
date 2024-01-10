import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { colors } from '../constants/colors';
import { DriverHome } from '../screens';
import { Profile as DriverProfile } from '../screens/Driver/Profile';
import { BankData as DriverBankData } from '../screens/Driver/BankData';
import { type DriverTabParamList } from '../types/navigation';
import { ChooseStores } from '../screens/Driver/ChooseStores';

const { Navigator, Screen } =
  createSharedElementStackNavigator<DriverTabParamList>();

export function DriverStackNavigator(): JSX.Element {
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.default.green },
        headerTitleStyle: { color: colors.default.textLight },
        headerTintColor: colors.default.textLight,
      }}
    >
      <Screen
        name="Home"
        options={{ headerShown: false }}
        component={DriverHome}
      />
      <Screen
        name="Profile"
        component={DriverProfile}
        options={{ headerTitle: 'Meus Dados' }}
      />
      <Screen
        name="ChooseStores"
        component={ChooseStores}
        options={{ headerTitle: 'Escolher Lojas para Trabalhar' }}
      />
      <Screen
        name="BankData"
        component={DriverBankData}
        options={{ headerTitle: 'Dados Bancários' }}
      />
    </Navigator>
  );
}
