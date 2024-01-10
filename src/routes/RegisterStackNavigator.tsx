import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { colors } from '../constants/colors';
import {
  DriverTerms,
  Entregas,
  Privacy,
  SelectUserType,
  SignUp,
  Terms,
} from '../screens';
import { type RegisterTabParamList } from '../types/navigation';

const { Navigator, Screen } =
  createSharedElementStackNavigator<RegisterTabParamList>();

export function RegisterStackNavigator(): JSX.Element {
  return (
    <Navigator>
      <Screen
        name="SelectUserType"
        component={SelectUserType}
        options={{
          headerTitle: 'Inscrever-se',
          headerStyle: { backgroundColor: colors.default.green },
          headerTitleStyle: { color: colors.default.textLight },
          headerTintColor: colors.default.textLight,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: 'Inscrever-se' }}
      />
      <Screen
        name="Terms"
        component={Terms}
        options={{ headerTitle: 'Termos e Condições' }}
      />
      <Screen
        name="Entrega"
        component={Entregas}
        options={{ headerTitle: 'Entregas' }}
      />
      <Screen
        name="Privacy"
        component={Privacy}
        options={{ headerTitle: 'Política e Privacidade' }}
      />
      <Screen
        name="DriverTerms"
        component={DriverTerms}
        options={{ headerTitle: 'Termos do Motorista' }}
      />
    </Navigator>
  );
}
