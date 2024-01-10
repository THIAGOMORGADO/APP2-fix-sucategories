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

import { getBrand } from '../../../components/Payment/Input/brand';
import { Card, Input } from '../../../components/Payment';
import { WebView } from 'react-native-webview';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from '../../../components/TextInput';
// import { Title } from '../../../components/Title';
// import { Container, Form } from './styles';
import { api, Count } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import LottieView from 'lottie-react-native';
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
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';
// import IconUser from '../../../assets/icon-user.svg'
// import IconCode from '../../assets/icon-code.svg'
// import IconDate from '../../assets/icon-date.svg'
// import IconNumber from '../../assets/icon-number.svg'
// import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
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

export const CartPayment = ({ route, navigation }) => {
  const {
    taxaEntrega,
    cartCheckoutUpdated,
    observation,
    country,
    paymentMethod,
  } = route.params;
  const { PagSeguroModule } = NativeModules;
  const [data, setData] = useState({
    name: '',
    number: '',
    validate: '',
    cvv: '',
  });
  const validateParts = data.validate.split('/');
  const month = validateParts[0]; // número antes da /
  const year = validateParts[1]; // número depois da /
  const cardNumberWithoutMask = data.number.replace(/\s/g, '');
  const [run, setRun] = useState(false);
  const [parcela, setParcela] = useState(null);
  const [success, setSuccess] = useState(false);
  const { cart } = useAuth();
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef<any>(null);
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
  const [encryptedData, setEncryptedData] = useState('');
  const script = `
	var script = document.createElement('script');
	script.src = 'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';
	script.async = true;
	script.onload = function() {
		var card = PagSeguro.encryptCard({
			publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzKjggmjZqowXbd2FSbe8PK5epLtard8houGjJ1i/0dpfME0+UvrszKoMfSsOe+HL8FODf+jpq5v/k2dTa+wUBL6ioxnjn2KsjpUFG1+4UGk8VOY8dAdTkvLRAe8Y+XsijxphrRq3dMTYok7KXWyGLbbNCqNe/PvnAdafFaFnlPyM5nhl+ALmUoxU2LR4KbYk7ULQvs1ciYZjXeyb9NlCq9QDkM1BTwpdFgN2hd64wdWU+I/WGlpOl95A7SVaYwH1EBcAzCq4G9/Aahi3aCR6W64pQ5msSyATxO6eC4PAS10aJNpjnXKAr+XagemmdtrK5f2GhNp80TyFAJzIwf11NQIDAQAB",
			holder: "${data.name}",
			number: "${cardNumberWithoutMask}",
			expMonth: "${month}",
			expYear: "20${year}",
			securityCode: "${data.cvv}"
		});

		var encrypted = card.encryptedCard;
		window.ReactNativeWebView.postMessage(encrypted);
	};
	document.body.appendChild(script);
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Criptografando dados...</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
      font-size: 50px;
      background-color: #f1f1f1;
    }
		.loading {
      width: 200px;
      height: 200px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
			font-size: 40px;
    }

    .loading-spinner {
      margin-bottom: 16px;
    }
		.loader {
			width: 120px;
			height: 120px;
			border: 5px solid #FFF;
			border-bottom-color: #28c17e;
			border-radius: 50%;
			display: inline-block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			}

			@keyframes rotation {
			0% {
					transform: rotate(0deg);
			}
			100% {
					transform: rotate(360deg);
			}
			}
  </style>
</head>
<body>
  <div class="loading-container">
    <div class="loading-spinner">
		<span class="loader"></span>
    </div>
    <div>Efectuando pagamento...</div>
  </div>
</body>
</html>

  `;
  const handleConfirm = () => {
    setEncryptedData('');
    setRun(true);
    setShowWebView(true);
  };

  const handleWebViewMessage = (event: any) => {
    const receivedData = event.nativeEvent.data;
    setEncryptedData(receivedData);
    setShowWebView(false);
    if (encryptedData != '') {
      handleSubmit();
    }
  };

  const [widthAnimated, setWidthAnimated] = useState(
    new Animated.Value(310)
  );
  const [backView, setBackView] = useState(false);
  const [icon, setIcon] = useState({
    icon: false,
  });
  const handleSubmit = async () => {
    try {
      // TODO: Change the following line with the next line, but before remove the next line
      const compras = cartCheckoutUpdated?.compras?.length
        ? cartCheckoutUpdated?.compras?.map((compra) => ({
            status: '',
            productId: compra.productId,
            qtdComprada: compra.qtdComprada,
            vendedorId: compra.vendedorId,
            formaPagamento:
              paymentMethod == 'Cartão de Crédito'
                ? 'CREDIT_CARD'
                : 'DEBIT_CARD',
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
          codigoPagamento:
            paymentMethod == 'Cartão de Crédito'
              ? 'CREDIT_CARD'
              : 'DEBIT_CARD',
          formaPagamento:
            paymentMethod == 'Cartão de Crédito'
              ? 'CREDIT_CARD'
              : 'DEBIT_CARD',
          dadoPagamento: {
            security_code: data.cvv,
            encrypted: encryptedData,
            name: data.name,
            installments: parcela == null ? '1' : parcela,
          },

          compras,
        }
      );

      /* if(newCompra.data.status){
      Alert.alert('Sucesso', newCompra.data.data);

    }else if(newCompra.data.data==null){
      Alert.alert('Ops', "Não foi possivel efectuar o pagamento, aconteceu algum erro");
    } */

      if (newCompra.data.errors == null) {
        setRun(false);
        if (newCompra?.data) {
          const qrCodeLink =
            newCompra.data.data.qrCodes[0].links.filter(
              (code) => code.rel === 'QRCODE.PNG'
            )[0];
          // console.log(newCompra.data.data.qrCodes);
        }
        setSuccess(true);
        cart?.clean();
        setTimeout(() => {
          navigation.navigate('Home');
        }, 3000);
      } else {
        setRun(false);
        setModalState({
          ...modalState,
          title: 'Oops!',
          description: 'Não foi possível efectuar a compr',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      }
    } catch (e: any) {
      setRun(false);
      // eslint-disable-next-line no-prototype-builtins
      const errors = e.response.data.hasOwnProperty('errors')
        ? e.response.data.errors
        : e.response.data.message;
      const message =
        typeof errors === 'string' ? errors : errors.join('. ');

      setModalState({
        ...modalState,
        title: 'Não foi possível efectuar a compra',
        description: message,
        isVisible: true,
        messageType: MessageTypes.FAIL,
        handleContinue: () => {
          setModalState({ ...modalState, isVisible: false });
        },
      });
    }
  };

  const animatedCard = (back: boolean) => {
    if (back && !backView) {
      Animated.timing(widthAnimated, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        Animated.timing(widthAnimated, {
          toValue: 310,
          duration: 400,
          useNativeDriver: false,
        }).start();
        setBackView(true);
      }, 400);
    }

    if (!back && backView) {
      Animated.timing(widthAnimated, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        Animated.timing(widthAnimated, {
          toValue: 310,
          duration: 400,
          useNativeDriver: false,
        }).start();
        setBackView(false);
      }, 400);
    }
  };
  return (
    <>
      {run ? (
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          scrollEnabled={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMessage={handleWebViewMessage}
          injectedJavaScript={script}
          onLoad={() => webViewRef.current.injectJavaScript(script)}
        />
      ) : (
        <ScrollView>
          <Container>
            {!success && (
              <>
                <Title>Meu cartão</Title>
                <Subtitle>Insira os dados do cartão</Subtitle>

                <Content>
                  <Animated.View style={{ width: widthAnimated }}>
                    <Card
                      data={data}
                      icon={icon?.icon}
                      back={backView}
                    />
                  </Animated.View>

                  <Input
                    placeholder="Nome do titular"
                    value={data.name}
                    onChangeText={(text) => {
                      setData({ ...data, name: text });
                      animatedCard(false);
                    }}
                  />

                  <Input
                    placeholder="Número do cartão"
                    value={data.number}
                    type="credit-card"
                    mask
                    onChangeText={(text) => {
                      setData({ ...data, number: text });
                      setIcon(getBrand(text.replace(/\s/g, '')));
                      animatedCard(false);
                    }}
                  />

                  <View>
                    <Input
                      placeholder="Validade"
                      value={data.validate}
                      type="custom"
                      options={{
                        mask: '99/99',
                      }}
                      mask
                      onChangeText={(text) => {
                        setData({ ...data, validate: text });
                        animatedCard(false);
                      }}
                      width="45%"
                    />
                    <Input
                      placeholder="CVV"
                      value={data.cvv}
                      type="custom"
                      options={{
                        mask: '9999',
                      }}
                      mask
                      onChangeText={(text) => {
                        setData({ ...data, cvv: text });
                        animatedCard(true);
                      }}
                      width="45%"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}
                  >
                    <Picker
                      selectedValue={parcela}
                      style={{ height: 50, width: '100%' }}
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
                </Content>

                <Button
                  onPress={() => {
                    handleConfirm();
                  }}
                >
                  <TextButton>Confirmar</TextButton>
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
                  }}
                >
                  <Title>Compra foi Finalizada com sucesso!</Title>
                </View>
              </>
            )}
          </Container>

          <MessageModal
            description={modalState.description}
            handleContinue={modalState.handleContinue}
            handleCancel={modalState.handleCancel}
            messageType={modalState.messageType}
            isVisible={modalState.isVisible}
            title={modalState.title}
          />
        </ScrollView>
      )}
    </>
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
