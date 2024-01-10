import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
// import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/auth';
import { Admin } from '../screens';

// import { RootStackParamList } from '../types/navigation';
import { BuyerStackNavigator } from './BuyerStackNavigator';
import { DriverStackNavigator } from './DriverStackNavigator';
import { SellerStackNavigator } from './SellerStackNavigator';
import { WelcomeStackNavigator } from './WelcomeStackNavigator';
import { StatusBar } from 'react-native';
import { colors } from '../constants/colors';

// const Admin = createStackNavigator<RootStackParamList>();
// const { Navigator, Screen } = createSharedElementStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  const { user, token, loading } = useAuth();

  return (
    <>
      {loading && <Spinner visible={loading} />}
      {(() => {
        if (!user || !token) return <WelcomeStackNavigator />;
        if (
          'perfil' in user &&
          user?.perfil.toLowerCase() === 'comprador'
        )
          return <BuyerStackNavigator />;
        if (
          'perfil' in user &&
          user?.perfil.toLowerCase() === 'vendedor'
        )
          return <SellerStackNavigator />;
        if (
          'perfil' in user &&
          user?.perfil.toLowerCase() === 'motorista'
        )
          return <DriverStackNavigator />;
        if (
          'perfil' in user &&
          user?.perfil.toLowerCase() === 'admin'
        )
          return <Admin />;
        return <WelcomeStackNavigator />;
      })()}
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.tabs.buyer.iconBlur}
      />
    </>
  );
};
