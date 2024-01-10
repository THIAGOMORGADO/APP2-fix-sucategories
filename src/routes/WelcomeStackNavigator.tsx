import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { colors } from '../constants/colors';
import { type WelcomeTabParamList } from '../types/navigation';
import {
  AboutUs,
  IntroApp,
  IntroBuyer,
  IntroDriver,
  IntroSeller,
} from '../screens';
import { RegisterStackNavigator } from './RegisterStackNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';

const { Navigator, Screen } =
  createSharedElementStackNavigator<WelcomeTabParamList>();

const forgotPasswordOpt = {
  headerShown: true,
  headerTitle: 'Esqueci a Senha',
  headerStyle: { backgroundColor: colors.default.green },
  headerTitleStyle: { color: colors.default.textLight },
  headerTintColor: colors.default.textLight,
};

export function WelcomeStackNavigator(): JSX.Element {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="IntroApp" component={IntroApp} />
      <Screen name="IntroBuyer" component={IntroBuyer} />
      <Screen name="IntroDriver" component={IntroDriver} />
      <Screen name="IntroSeller" component={IntroSeller} />
      <Screen name="SignInType" component={AuthStackNavigator} />
      <Screen
        name="SelectUserType"
        component={RegisterStackNavigator}
      />
      <Screen
        name="AboutUs"
        component={AboutUs}
        options={{ ...forgotPasswordOpt, headerTitle: 'Quem Somos' }}
      />
    </Navigator>
  );
}
