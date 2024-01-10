import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

import { User } from './User';
import { Delivery } from './Delivery';
import { DeliveryHistory } from './DeliveryHistory';

const Tab = createMaterialTopTabNavigator();

export const DriverTabs: React.FC = () => {
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

          if (route.name === 'Delivery') {
            iconName = 'truck';
          } else if (route.name === 'DeliveryHistory') {
            iconName = 'history';
          } else if (route.name === 'User') {
            iconName = 'user-circle';
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
      <Tab.Screen name="Delivery" component={Delivery} />
      <Tab.Screen
        name="DeliveryHistory"
        component={DeliveryHistory}
      />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};
