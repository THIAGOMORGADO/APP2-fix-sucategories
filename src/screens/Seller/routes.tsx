import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Products } from './Products';
import { User } from './User';
import { Sales } from './Sales';
import { colors } from '../../constants/colors';

const SellerTabsNavigator = createMaterialBottomTabNavigator();

export const SellerTabs: React.FC = () => {
  return (
    <SellerTabsNavigator.Navigator
      barStyle={{ backgroundColor: 'white' }}
    >
      <SellerTabsNavigator.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="leaf"
              size={20}
              color={
                focused
                  ? colors.tabs.seller.iconFocused
                  : colors.tabs.seller.iconBlur
              }
            />
          ),
          tabBarLabel: 'Produtos',
        }}
      />
      <SellerTabsNavigator.Screen
        name="Sales"
        component={Sales}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cash"
              size={20}
              color={
                focused
                  ? colors.tabs.seller.iconFocused
                  : colors.tabs.seller.iconBlur
              }
            />
          ),
          tabBarLabel: 'Vendas',
        }}
      />
      <SellerTabsNavigator.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={20}
              color={
                focused
                  ? colors.tabs.seller.iconFocused
                  : colors.tabs.seller.iconBlur
              }
            />
          ),
          tabBarLabel: 'Minha Conta',
        }}
      />
    </SellerTabsNavigator.Navigator>
  );
};
