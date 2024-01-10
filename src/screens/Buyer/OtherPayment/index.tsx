import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  // ScrollView,
  SafeAreaView,
  StyleSheet,
  NativeModules,
  Image,
} from 'react-native';

import { api, Count } from '../../../config/api';
import { Picker } from '@react-native-picker/picker';
import {
  ScrollView,
  Container,
  Container2,
  Title,
  Subtitle,
  Content,
  Button,
  TextButton,
  View,
} from './styles';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../../../hooks/auth';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

const LOGO: string = require('../../../assets/icon-user.svg').default;
interface ICartCheckoutUpdated {
  compradorId: number | undefined;
  compras: Array<{
    distanciaEntrega: string;
    enderecoEntrega: object;
    formaPagamento: string;
    productId: number;
    qtdComprada: number;
    vlPago: number;
  }>;
  vlTotal: number;
  formaPagamento: string;
}

export const OtherPayment = ({ route, navigation }) => {
  const {
    taxaEntrega,
    cartCheckoutUpdated,
    observation,
    country,
    paymentMethod,
  } = route.params;
  const { user, updateUser, setLoading } = useAuth();
  const { PagSeguroModule } = NativeModules;
  const [data, setData] = useState({
    name: '',
    number: '',
    validate: '',
    cvv: '',
  });
  const validateParts = data.validate.split('/');
  const [success, setSuccess] = useState(false);
  const [qrCodeImageUri, setQrCodeImageUri] = useState('');
  const [parcela, setParcela] = useState(null);
  const { cart } = useAuth();
  const [widthAnimated, setWidthAnimated] = useState(
    new Animated.Value(310)
  );
  const [backView, setBackView] = useState(false);
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
  const [icon, setIcon] = useState({
    icon: false,
  });
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Change the following line with the next line, but before remove the next line
      const compras = cartCheckoutUpdated?.compras?.length
        ? cartCheckoutUpdated?.compras?.map((compra) => ({
            status: '',
            productId: compra.productId,
            qtdComprada: compra.qtdComprada,
            vendedorId: compra.vendedorId,
            formaPagamento: paymentMethod == 'Pix' ? 'PIX' : 'BOLETO',
            vlPago: compra.productPrice * compra.qtdComprada,
            enderecoLoja: {},
            taxaEntrega,
            distanciaEntrega: compra.distanciaEntrega,
            enderecoEntrega: compra.enderecoEntrega,
            unidadeMedida: compra.unidadeMedida,
            productPrice: compra.productPrice,
            observacao: observation,
            fracao: 0,
          }))
        : [];

      const newCompra = await api.post(
        `api/compras/v1/newCompra?pais=${country}`,
        {
          compradorId: cartCheckoutUpdated.compradorId,
          statusCompra: '',
          taxaEntrega,
          vlTotal: (taxaEntrega
            ? cartCheckoutUpdated.vlTotal + taxaEntrega
            : cartCheckoutUpdated.vlTotal
          ).toFixed(3),
          codigoPagamento: paymentMethod == 'Pix' ? 'PIX' : 'BOLETO',
          formaPagamento: paymentMethod == 'Pix' ? 'PIX' : 'BOLETO',
          dadoPagamento: {
            installments: parcela == null ? '1' : parcela,
          },

          compras,
        }
      );

      if (newCompra.data.errors == null) {
        setLoading(false);
        if (newCompra?.data) {
          const qrCodeLink =
            newCompra.data.data.qrCodes[0].links.filter(
              (code) => code.rel === 'QRCODE.PNG'
            )[0];
          // console.log(newCompra.data.data.qrCodes);
          setQrCodeImageUri(qrCodeLink.href);
        }
        setSuccess(true);
        cart?.clean();
      } else {
        setLoading(false);
        setModalState({
          ...modalState,
          title: 'Oops!',
          description: 'Não foi possível efectuar a compra',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      }
    } catch (e: any) {
      setLoading(false);
      // eslint-disable-next-line no-prototype-builtins
      const errors = e.response.data.hasOwnProperty('errors')
        ? e.response.data.errors
        : e.response.data.message;
      const message =
        typeof errors === 'string' ? errors : errors.join('. ');

      setModalState({
        ...modalState,
        title: 'Não foi possível efectuar sua compra',
        description: message,
        isVisible: true,
        messageType: MessageTypes.FAIL,
        handleContinue: () => {
          setModalState({ ...modalState, isVisible: false });
        },
      });
    }
  };

  return (
    <ScrollView>
      <Container>
        {!success && (
          <>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Title>{paymentMethod}</Title>

              <Subtitle>
                Para efectuar a compra Gera o {paymentMethod}
              </Subtitle>
            </View>
            {paymentMethod == 'Boleto' && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}
              >
                <Picker
                  selectedValue={parcela}
                  style={{ height: 50, width: '50%' }}
                  onValueChange={(itemValue, itemIndex) => {
                    setParcela(itemValue);
                  }}
                >
                  <Picker.Item label="Parcelar?" value={null} />
                  {Count.map((method, index) => (
                    <Picker.Item
                      key={index}
                      label={method.label}
                      value={method.value}
                    />
                  ))}
                </Picker>
              </View>
            )}
            <Button
              onPress={async () => {
                await handleSubmit();
              }}
            >
              <TextButton>Gerar {paymentMethod}</TextButton>
            </Button>
          </>
        )}

        {success && (
          <>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Title>{paymentMethod}</Title>
              {paymentMethod == 'Boleto' ? (
                <Subtitle>
                  Compra foi Finalizada com sucesso!
                </Subtitle>
              ) : (
                <Subtitle>A sua Compra foi iniciada!</Subtitle>
              )}
              {paymentMethod == 'Boleto' ? (
                <Subtitle>
                  Use este codigo para pagar a compra
                </Subtitle>
              ) : (
                <Subtitle>
                  Use este codigo para pagar a compra
                </Subtitle>
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={{ uri: qrCodeImageUri }}
                style={{ width: 200, height: 200 }} // Defina o tamanho desejado
              />
            </View>
          </>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
});
