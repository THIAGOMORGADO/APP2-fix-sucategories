import React, { useState, useEffect } from 'react';
import {
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../hooks/auth';
import { type IProduct } from '../../../@types';
import { api } from '../../../config/api';
import NumberFormat from '../../../utils/NumberFormat';
import { imgNotFound } from '../../../constants/imgNotFound';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import {
  type CountryList,
  type IEndereco,
} from '../../../@types/user';
import {
  Footer,
  Header,
  InfoWrapper,
  ItemTotal,
  Name,
  PriceTotal,
  Quantity,
  QuantityTotal,
} from '../Cart/styles';
import {
  Container,
  ReviewContainer,
  CartWrapper,
  Img,
  LineWrapper,
  FreteTotal,
  TotalWrapper,
  Subtitle,
} from './styles';
import { TextInput } from '../../../components/TextInput';
import { errorHandler } from '../../../utils/errorInstance';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface INavigation {
  navigate: (route: string, params?: any) => void;
  goBack: (route: string) => void;
}

interface ICartCheckoutUpdated {
  compradorId: number | undefined;
  compras: Array<{
    distanciaEntrega: string;
    enderecoEntrega: object;
    formaPagamento: string;
    productId: number;
    unidadeMedida: string;
    vendedorId: number;
    qtdComprada: number;
    vlPago: number;
  }>;
  vlTotal: number;
  formaPagamento: string;
}

interface ICheckoutConfirm {
  navigation: INavigation;
  route: {
    params: {
      taxaEntrega: number;
      cartCheckoutUpdated: ICartCheckoutUpdated;
    };
  };
}

interface ICartCheckout {
  productId: number;
  enderecoLoja: IEndereco;
  qtdComprada: number;
  vlPago: number;
  unidadeMedida: string;
  vendedorId: number;
}

interface ICountry {
  nome: string;
  iso: CountryList;
}

export function CheckoutConfirm(props: any): JSX.Element {
  const { navigation, route } = props as ICheckoutConfirm;
  const win = Dimensions.get('window');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [observation, setObservation] = useState<string>('');
  const cartCheckout: ICartCheckout[] = [];
  let totalQuantity = 0;
  let totalPrice = 0;
  const { cart, user, setLoading } = useAuth();
  const [modalState, setModalState] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
    messageType: MessageTypes;
    handleContinue: () => void;
    handleCancel: () => void;
  }>({
    title: '',
    description: '',
    messageType: MessageTypes.INFORMATION,
    isVisible: false,
    handleContinue: () => {},
    handleCancel: () => {},
  });
  const { taxaEntrega, cartCheckoutUpdated } = route.params;
  const { endereco } = user;

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(null);
  const [paymentMethods] = useState([
    'Cartão de Crédito',
    'Cartão de Dédito',
    'Boleto',
    'Pix',
  ]);

  const countries: ICountry[] = [
    { nome: 'Brasil', iso: 'BRA' },
    { nome: 'Portugal', iso: 'PRT' },
    { nome: 'Angola', iso: 'AGO' },
  ];

  const country: CountryList = countries.filter(
    (item) => item.nome === endereco?.pais
  )[0].iso;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('api/products/v1/findAll');
        setProducts(response.data.data);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler(e, 'api/products/v1/findAll', () => {});
      } finally {
        setLoading(false);
      }
    })();
  }, [cart?.items]);

  return (
    <Container scrollEnabled>
      <Title fontSize="20px">Resumo do Carrinho</Title>
      {cart?.items.length ? (
        <>
          <ReviewContainer>
            {cart &&
              cart?.items.map((cartItem) => {
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
                    vendedorId: cartItem.vendedorId,
                  });

                  totalQuantity += cartItem.qtd;
                  totalPrice += parseFloat(productTotal);
                  let imgURL = imgNotFound;
                  let imgHeight = 60;

                  if (item.pictures.length > 0) {
                    imgURL = { uri: item.pictures[0] };
                    (async () =>
                      Image.getSize(
                        imgURL.uri,
                        (width: number, height: number) => {
                          const ratio = 60 / width;
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
                        </Header>
                        <Footer>
                          <Quantity>
                            Quantidade:
                            {cartItem.qtd}
                          </Quantity>
                          <ItemTotal>
                            {'R$ ' + parseFloat(productTotal)}
                          </ItemTotal>
                        </Footer>
                      </InfoWrapper>
                    </CartWrapper>
                  );
                }
              })}
          </ReviewContainer>
          <TotalWrapper>
            <LineWrapper>
              <QuantityTotal>
                Quantidade:
                {totalQuantity}
              </QuantityTotal>
              <FreteTotal>{'R$ ' + totalPrice}</FreteTotal>
            </LineWrapper>
            <LineWrapper>
              <QuantityTotal>Frete:</QuantityTotal>
              <FreteTotal>
                {parseFloat(`${taxaEntrega}`) >= 0
                  ? 'R$ ' + taxaEntrega.toFixed(3)
                  : '-'}
              </FreteTotal>
            </LineWrapper>
            <LineWrapper>
              <QuantityTotal>Total:</QuantityTotal>
              <PriceTotal>
                {'R$ ' +
                  (taxaEntrega
                    ? totalPrice + taxaEntrega
                    : totalPrice
                  ).toFixed(3)}
              </PriceTotal>
            </LineWrapper>
          </TotalWrapper>
          <TextInput
            name="observacao"
            label="Adicionar Observação"
            values={observation}
            mode="outlined"
            errors={[]}
            multiline
            numberOfLines={4}
            // handleSubmit(navigation, country, cartCheckoutUpdated, taxaEntrega, observation, setLoading)
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            handleChange={() => {}}
            onChangeText={setObservation}
          />

          <Picker
            selectedValue={selectedPaymentMethod}
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedPaymentMethod(itemValue);
            }}
          >
            <Picker.Item
              label="Selecione a forma de pagamento"
              value={null}
            />
            {paymentMethods.map((method, index) => (
              <Picker.Item
                key={index}
                label={method}
                value={method}
              />
            ))}
          </Picker>

          {selectedPaymentMethod === 'Cartão de Crédito' ||
          selectedPaymentMethod === 'Cartão de Dédito' ? (
            <View style={{ marginBottom: 25 }}>
              <Button
                backgroundColor="#2bc17e"
                onPress={() => {
                  if (selectedPaymentMethod != null) {
                    navigation.navigate('CartPayment', {
                      country,
                      cartCheckoutUpdated,
                      taxaEntrega,
                      observation,
                      paymentMethod: selectedPaymentMethod,
                    });
                  } else {
                    setModalState({
                      ...modalState,
                      title: 'Obrigatório',
                      description: 'Escolha uma forma de pagamento',
                      isVisible: true,
                      messageType: MessageTypes.FAIL,
                      handleContinue: () => {
                        setModalState({
                          ...modalState,
                          isVisible: false,
                        });
                      },
                    });
                  }
                }}
              >
                Ir para pagamento
              </Button>
            </View>
          ) : (
            <View style={{ marginBottom: 25 }}>
              <Button
                backgroundColor="#2bc17e"
                onPress={() => {
                  if (selectedPaymentMethod != null) {
                    navigation.navigate('OtherPayment', {
                      country,
                      cartCheckoutUpdated,
                      taxaEntrega,
                      observation,
                      paymentMethod: selectedPaymentMethod,
                    });
                  } else {
                    setModalState({
                      ...modalState,
                      title: 'Obrigatório',
                      description: 'Escolha uma forma de pagamento',
                      isVisible: true,
                      messageType: MessageTypes.FAIL,
                      handleContinue: () => {
                        setModalState({
                          ...modalState,
                          isVisible: false,
                        });
                      },
                    });
                  }
                }}
              >
                Ir para pagamento
              </Button>
            </View>
          )}
        </>
      ) : (
        <View
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Subtitle>Carrinho vazio</Subtitle>
        </View>
      )}

      <MessageModal
        description={modalState.description}
        handleContinue={modalState.handleContinue}
        handleCancel={modalState.handleCancel}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </Container>
  );
}
