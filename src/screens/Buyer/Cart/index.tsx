/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import { Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { CartItem, type IProduct } from '../../../@types';
import { api } from '../../../config/api';
import NumberFormat from '../../../utils/NumberFormat';
import { imgNotFound } from '../../../constants/imgNotFound';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import { IEndereco } from '../../../@types/user';

import {
  Container,
  CartWrapper,
  Img,
  Header,
  Name,
  BtnTrash,
  Icon,
  InfoWrapper,
  Footer,
  Quantity,
  ItemTotal,
  TotalWrapper,
  QuantityTotal,
  PriceTotal,
  EmptyCartContainer,
  EmptyCartImg,
} from './styles';
import { type BuyerTabScreenProps } from '../../../types/navigation';
import { type CartCheckoutProps } from '../../../types/screens/buyer/cart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendPushNotification(
  expoPushToken: string
): Promise<void> {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cartImage = require('../../../../assets/images/empty-cart.png');

const Cart: React.FC = () => {
  const win = Dimensions.get('window');
  const [products, setProducts] = useState<IProduct[]>([]);
  const cartCheckout: CartCheckoutProps[] = [];
  let totalQuantity = 0;
  let totalPrice = 0;
  const { cart } = useAuth();
  const { navigate } = useNavigation<BuyerTabScreenProps>();

  useEffect(() => {
    loadCartItems();
  }, [cart?.items]);

  const loadCartItems = useCallback(async () => {
    const response = await api.get('api/products/v1/findAll');
    const ids = cart?.items.map((item: CartItem) => item.id);
    const cartItems = response.data.data.filter(
      //(item: CartItem) => ids?.some((id) => id === item.id)
      (item: CartItem) => !!ids?.includes(item.id)
    );

    setProducts(cartItems);
  }, [cart]);

  return cart && cart.items.length > 0 ? (
    <Container scrollEnabled>
      <Title fontSize="20px">Meu carrinho</Title>

      {cart
        ? cart.items.map((cartItem) => {
            const item = products.filter(
              (product) => product.id === cartItem.id
            )[0];

            if (item) {
              const productTotal = (
                (item.price * 100 * cartItem.qtd) /
                100
              ).toFixed(2);
              cartCheckout.push({
                productId: item.id,
                vlPago: parseFloat(productTotal),
                qtdComprada: cartItem.qtd,
                enderecoLoja: cartItem.enderecoLoja,
                unidadeMedida: cartItem.unidadeMedida,
                productPrice: cartItem.price,
                vendedorId: cartItem.vendedorId,
              });

              totalQuantity += cartItem.qtd;
              totalPrice += parseFloat(productTotal);
              let imgURL = imgNotFound;
              let imgHeight = 100;

              if (item.pictures.length > 0) {
                imgURL = { uri: item.pictures[0] };
                (async () =>
                  Image.getSize(
                    imgURL.uri,
                    (width: number, height: number) => {
                      const ratio = 100 / width;
                      imgHeight = height * ratio;
                    }
                  ))();
              }

              return (
                <CartWrapper key={cartItem.id}>
                  <Img source={imgURL} imgWidth={imgHeight} />
                  <InfoWrapper winWidth={win.width}>
                    <Header>
                      <Name>{item.name}</Name>
                      <BtnTrash
                        onPress={(): void => {
                          if (cart) cart.removeFromCart(item.id);
                        }}
                      >
                        <Icon name="trash-o" />
                      </BtnTrash>
                    </Header>
                    <Footer>
                      <Quantity>
                        Quantidade:
                        {cartItem.qtd}
                      </Quantity>
                      <ItemTotal>{productTotal}</ItemTotal>
                    </Footer>
                  </InfoWrapper>
                </CartWrapper>
              );
            }

            return null;
          })
        : null}
      <TotalWrapper>
        <QuantityTotal>
          Quantidade:
          {totalQuantity}
        </QuantityTotal>
        <PriceTotal>
          Total:
          {'R$ ' + totalPrice}
        </PriceTotal>
      </TotalWrapper>

      <Button
        upper
        backgroundColor='#2bc17e'
        onPress={() => {
          navigate('CheckoutAddress', { cartCheckout } as never);
        }}
      >
        Continuar
      </Button>
    </Container>
  ) : (
    <EmptyCartContainer>
      <EmptyCartImg source={cartImage} />
    </EmptyCartContainer>
  );
};
// {NumberFormat.currency(parseFloat(productTotal), undefined, item.country)}
// Total:{NumberFormat.currency(totalPrice, undefined, 'BRA')}

export default Cart;
