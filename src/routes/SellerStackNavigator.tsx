import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { colors } from '../constants/colors';
import {
  EditProduct,
  Entregas,
  NewProduct,
  SalesHistory,
  SellerHome,
} from '../screens';
import { Profile as SellerProfile } from '../screens/Seller/Profile';
import { BankData as SellerBankData } from '../screens/Seller/BankData';
import { type SellerTabParamList } from '../types/navigation';

const { Navigator, Screen } =
  createSharedElementStackNavigator<SellerTabParamList>();

export function SellerStackNavigator(): JSX.Element {
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
        component={SellerHome}
        options={{ headerShown: false }}
      />
      <Screen
        name="NewProduct"
        component={NewProduct}
        options={{ headerTitle: 'Adicionar Novo Produto' }}
      />
      <Screen
        name="EditProduct"
        component={EditProduct}
        options={{ headerTitle: 'Editar Produto' }}
      />
      <Screen
        name="Profile"
        component={SellerProfile}
        options={{ headerTitle: 'Meus Dados' }}
      />
      <Screen
        name="BankData"
        component={SellerBankData}
        options={{ headerTitle: 'Dados Bancários' }}
      />
      <Screen
        name="SalesHistory"
        component={SalesHistory}
        options={{ headerTitle: 'Histórico de Vendas' }}
      />
      <Screen
        name="Entrega"
        component={Entregas}
        options={{ headerTitle: 'Entregas' }}
      />
    </Navigator>
  );
}
