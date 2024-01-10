import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import {
  BuyerHome,
  BuyerProduct,
  Checkout,
  CheckoutAddress,
  CheckoutConfirm,
  Products,
  Stores,
  Shops,
  Category,
  SuperCategory,
} from '../screens';
import { Profile as BuyerProfile } from '../screens/Buyer/Profile';
import { Orders } from '../screens/Buyer/Orders';
import { CartPayment } from '../screens/Buyer/CartPayment';
import { OtherPayment } from '../screens/Buyer/OtherPayment';
import { OrderDetails } from '../screens/Buyer/OrderDetails';
import { CheckoutCard } from '../screens/Buyer/CheckoutCard';

import Cart from '../screens/Buyer/Cart';

const Buyer = createStackNavigator();
export function BuyerStackNavigator(): JSX.Element {
  return (
    <Buyer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.default.green },
        headerTitleStyle: { color: colors.default.textLight },
        headerTintColor: colors.default.textLight,
      }}
    >
      <Buyer.Screen
        name="Home"
        component={BuyerHome}
        options={{ headerShown: false }}
      />
      <Buyer.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: 'Carrinho' }}
      />
      <Buyer.Screen
        name="Stores"
        component={Stores}
        options={{ headerTitle: 'Lojas' }}
      />
      <Buyer.Screen
        name="Products"
        component={Products}
        options={{ headerTitle: 'Produtos' }}
      />
      <Buyer.Screen
        name="Shops"
        component={Shops}
        options={{
          headerTitle: 'Lojas',
          headerStyle: { marginTop: 0, backgroundColor: colors.default.green },
        }}
      />
      <Buyer.Screen
        name="SuperCategory"
        component={SuperCategory}
        options={{ headerTitle: 'Categorias' }}
      />
      <Buyer.Screen
        name="Category"
        component={Category}
        options={{ headerTitle: 'SubCategorias' }}
      />
      <Buyer.Screen
        name="Product"
        component={BuyerProduct}
        options={{ headerTitle: 'Detalhes' }}
      />
      <Buyer.Screen name="Checkout" component={Checkout} />
      <Buyer.Screen
        name="Profile"
        component={BuyerProfile}
        options={{ headerTitle: 'Meus Dados' }}
      />
      <Buyer.Screen
        name="CartPayment"
        component={CartPayment}
        options={{ headerTitle: 'Pagamento' }}
      />
      <Buyer.Screen
        name="OtherPayment"
        component={OtherPayment}
        options={{ headerTitle: 'Pagamento' }}
      />
      <Buyer.Screen
        name="BankData"
        component={BuyerProfile}
        options={{ headerTitle: 'Dados Bancários' }}
      />
      <Buyer.Screen
        name="Orders"
        component={Orders}
        options={{ headerTitle: 'Meus Pedidos' }}
      />
      <Buyer.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ headerTitle: 'Detalhes' }}
      />
      <Buyer.Screen name="CheckoutCard" component={CheckoutCard} />
      <Buyer.Screen
        name="CheckoutConfirm"
        component={CheckoutConfirm}
        options={{ headerTitle: 'Resumo' }}
      />
      <Buyer.Screen
        name="CheckoutAddress"
        component={CheckoutAddress}
        options={{ headerTitle: 'Endereço' }}
      />
    </Buyer.Navigator>
  );
}
