import React, { useEffect } from 'react';

import { WebView } from 'react-native-webview';
import { type CountryList } from '../../../@types/user';
import { useAuth } from '../../../hooks/auth';

interface ICheckoutCard {
  navigation: {
    navigate: (route: string, params?: any) => void;
    goBack: (route: string) => void;
    reset: (route: {
      index: number;
      routes: [{ name: string }];
    }) => void;
    addListener: (
      name: string,
      callback: (event: any) => void
    ) => void;
  };
  route: {
    params: {
      paymentCode: string;
      country: CountryList;
    };
  };
}

export const CheckoutCard: React.FC<ICheckoutCard> = ({
  navigation,
  route,
}) => {
  const { cart } = useAuth();

  /* useEffect(
    () =>
      navigation.addListener('beforeRemove', async (e) => {
        await cart.clean();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }),
    [navigation],
  ); */

  // TODO: Change the line with "AGO" to "BRA" - This is very important
  if (route.params.country === 'AGO') {
    // if (route.params.country === "BRA") {
    return (
      <WebView
        source={{
          uri: `https://gpo.emis.co.ao/gpoportal/frame?token=${route.params.paymentCode}`,
        }}
      />
    );
  }
  return (
    <WebView
      source={{
        uri: `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${route.params.paymentCode}`,
      }}
    />
  );
};
