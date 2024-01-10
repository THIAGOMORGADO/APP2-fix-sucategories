import React, { useState } from 'react';
import { Image, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import NumberFormat from '../../../utils/NumberFormat';
import { imgNotFound } from '../../../constants/imgNotFound';
import {
  type CountryList,
  type ICompra,
  type IEndereco,
  type IUserCompra,
} from '../../../@types/user';
import { translateStatus } from '../Orders';

import {
  Container,
  CartWrapper,
  Img,
  Header,
  Name,
  Footer,
  Quantity,
  ItemTotal,
  TotalWrapper,
  PriceTotal,
  Title,
  Row,
  CartInfoWrapper,
  TotalHeader,
  Devider,
} from './styles';
import {
  StatusText,
  InfoWrapper,
  CommonText,
  DateText,
} from '../Orders/styles';
import { OrderSteps } from '../../../components/OrderSteps';
import { Button } from '../../../components/Button';
import { api } from '../../../config/api';

interface ICartCheckout {
  productId: number;
  qtdComprada: number;
  enderecoEntrega: IEndereco;
  vlPago: number;
}

interface IOrderDetail {
  navigation: any;
  route: {
    params: {
      order: IUserCompra;
    };
  };
}

const handleDate = (date: Date) => {
  const fullDate = new Date(date);

  return `${fullDate.getDate()}/${
    fullDate.getMonth() + 1
  }/${fullDate.getFullYear()}`;
};

export const OrderDetails: React.FC<IOrderDetail> = ({
  navigation,
  route,
}) => {
  const win = Dimensions.get('window');
  const [order, setOrder] = useState<IUserCompra>(route.params.order);
  console.log('aqui está o tem:');
  return (
    <Container scrollEnabled>
      <Title fontSize="20px">Meu Pedido</Title>

      {order.compras.map((item, index) => {
        const pais =
          item.enderecoEntrega.pais === 'Brasil' ? 'BRA' : 'AGO';
        const imgURL =
          item.productPictures.length > 0
            ? { uri: item.productPictures[0] }
            : imgNotFound;
        let imgHeight = 200;
        if (item.productPictures.length > 0) {
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
          <CartItem
            key={index}
            {...{ imgHeight, item, imgURL, width: win.width, pais }}
          />
        );
      })}
      <TotalWrapper>
        <TotalHeader>
          <OrderSteps
            status={order.statusCompra}
            icon={[
              'money-bill-alt',
              'clipboard-check',
              'box',
              'truck',
              'check',
            ]}
          />
        </TotalHeader>
        <Devider />
        <Row>
          <InfoWrapper>
            <CommonText>Status:</CommonText>
            <StatusText statusName={order.statusCompra}>
              {translateStatus(order.statusCompra)}
            </StatusText>
          </InfoWrapper>
          <InfoWrapper>
            <CommonText>Pedido recebido em: </CommonText>
            <DateText>
              {handleDate(order.compras[0].createdAt)}
            </DateText>
          </InfoWrapper>
        </Row>
        <PriceTotal>
          Total:{' '}
          {NumberFormat.currency(
            order.compras.reduce(
              (accumulator, atual) => atual.vlPago + accumulator,
              0
            ),
            undefined,
            'BRA'
          )}
        </PriceTotal>
      </TotalWrapper>

      <Button
        backgroundColor="#2bc17e"
        onPress={() => {
          Alert.alert(
            'Importante',
            // eslint-disable-next-line max-len
            'O Seu pagamento ainda está sendo processado.\nTransações PIX podem levar até 60min para serem processadas e boletos até 72h após o pagamento.',
            [
              {
                text: 'Cancelar',
              },
              {
                text: 'Ir para pagamento',
                onPress: () => {
                  navigation.navigate('CheckoutCard', {
                    paymentCode: order.codigoPagamento,
                    country: order.compras[0].enderecoLoja.pais,
                  });
                },
              },
            ]
          );
        }}
      >
        Pagar
      </Button>
    </Container>
  );
};

interface ICartItem {
  imgURL: string;
  imgHeight: number;
  width: number;
  item: ICompra;
  pais: CountryList;
}

const CartItem: React.FC<ICartItem> = ({
  imgURL,
  imgHeight,
  width,
  item,
  pais,
}) => {
  return (
    <CartWrapper>
      <Img source={imgURL} imgWidth={imgHeight} />
      <CartInfoWrapper winWidth={width}>
        <Header>
          <Name>{item.productName}</Name>
        </Header>
        <Footer>
          <Quantity>
            Quantidade:
            {item.qtdComprada}
          </Quantity>
          <ItemTotal>
            {NumberFormat.currency(
              item.productPrice,
              undefined,
              pais
            )}
          </ItemTotal>
        </Footer>
      </CartInfoWrapper>
    </CartWrapper>
  );
};

const paymentTest = async (cartId: number) => {
  try {
    const response = await api.put(`/test/v1/pagarCompra/${cartId}`);
    Alert.alert(
      'Compra de teste efetuada com sucesso',
      response.data.status,
      [
        {
          text: 'Ok',
        },
      ]
    );
  } catch (e) {}
};
