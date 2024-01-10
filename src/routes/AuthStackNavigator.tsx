import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { colors } from '../constants/colors';
import { ForgotPassword, SignIn } from '../screens';
import { type AuthTabParamList } from '../types/navigation';
import { BuyerStackNavigator } from './BuyerStackNavigator';
import { DriverStackNavigator } from './DriverStackNavigator';
import { SellerStackNavigator } from './SellerStackNavigator';

const { Navigator, Screen } =
  createSharedElementStackNavigator<AuthTabParamList>();

const forgotPasswordOpt = {
  headerShown: true,
  headerTitle: 'Esqueci a Senha',
  headerStyle: { backgroundColor: colors.default.green },
  headerTitleStyle: { color: colors.default.textLight },
  headerTintColor: colors.default.textLight,
};

export function AuthStackNavigator(): JSX.Element {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={forgotPasswordOpt}
      />
      <Screen name="Buyer" component={BuyerStackNavigator} />
      <Screen name="Driver" component={DriverStackNavigator} />
      <Screen name="Seller" component={SellerStackNavigator} />
    </Navigator>
  );
}
