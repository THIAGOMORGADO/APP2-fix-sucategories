import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import Cart from './Cart';
import Favorite from './Favorite';
import { Stores } from './Stores';
import { Categories } from './Categories';
import Search from './Search';
import { User } from './User';
import { CheckoutAddress } from './CheckoutAddress';
import { colors } from '../../constants/colors';
import { CheckoutConfirm } from './CheckoutConfirm';

const Tab = createMaterialTopTabNavigator();
const TabChackout = createStackNavigator();

export const BuyerTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.default.green,
        },
        showIcon: true,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Cart') {
            iconName = 'shopping-basket';
          } else if (route.name === 'Favorite') {
            iconName = 'heart';
          } else if (route.name === 'Stores') {
            iconName = 'home';
          } else if (route.name === 'User') {
            iconName = 'user-circle';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={
                focused
                  ? colors.tabs.buyer.iconFocused
                  : colors.tabs.buyer.iconBlur
              }
            />
          );
        },
      })}
    >
      <Tab.Screen name="Stores" component={Categories} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export const BuyerCheckoutTabs: React.FC<{ params: any }> = ({
  params,
}) => {
  return (
    <TabChackout.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.default.green,
        },
      }}
    ></TabChackout.Navigator>
  );
};
