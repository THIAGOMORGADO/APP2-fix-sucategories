import React, { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { SelectList } from '../../../components/SelectList';
import { type IEndereco } from '../../../@types/user';
import { Container, Form, Title } from './styles';
import { useAuth } from '../../../hooks/auth';
import { google, api } from '../../../config/api';
import { errorHandler } from '../../../utils/errorInstance';
import { type BuyerTabScreenProps } from '../../../types/navigation';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface ICheckoutAddress {
  navigation: {
    navigate: (route: string, params?: any) => void;
    goBack: (route: string) => void;
  };
  route: {
    params: {
      cartCheckout: Array<{
        enderecoLoja: IEndereco;
        productId: number;
        qtdComprada: number;
        vlPago: number;
        unidadeMedida: number;
        productPrice: number;
        vendedorId: number;
        distanciaEntrega: string;
      }>;
    };
  };
}

interface IMapsApiResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: Array<{
    elements: Array<{
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      status: string;
    }>;
  }>;
  status: string;
}

interface IViaCepType {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

const handleDistance = (d: string) => {
  console.log('!!»»»» HandleDistance: [d]', d);

  const distance = parseFloat(d.split(' ')[0].replace(',', '.'));
  const isKm = d.search('km') >= 0;
  const distForApi = isKm ? distance : distance / 1000;
  // console.log({d, distance, isKm, distForApi})
  return `${distForApi} km`;
};

const handlerCEP = async (
  values: any,
  setLoading: (value: any) => void,
  validateForm: (values?: any) => void,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
): Promise<void> => {
  setLoading(true);
  const CEP = values.cep;

  try {
    const { data: CEPResponse } = await Axios.get<IViaCepType>(
      `https://viacep.com.br/ws/${CEP}/json/`
    );
    console.log(CEPResponse);
    const { bairro, logradouro, uf, localidade } = CEPResponse;
    const updatedValues = {
      ...values,
      rua: logradouro,
      bairro,
      cidade: localidade,
      estado: uf,
    };

    for (let i = 0; i < Object.keys(updatedValues).length; i++) {
      const fieldName = Object.keys(updatedValues)[i];
      const fieldValue = Object.values(updatedValues)[i];
      setFieldValue(fieldName, fieldValue, true);
    }
    validateForm(); // Chame apenas uma vez após a atualização dos valores
  } catch (e: unknown) {
    errorHandler(e, `https://viacep.com.br/ws/${CEP}/json/`, () => {
      Alert.alert(
        'Oops!',
        'Ocorreu algum erro ao carregar as informações do CEP. Por favor, adicione um CEP correto ou tente novamente mais tarde.'
      );
    });
  }
  setLoading(false);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function CheckoutAddress(props: any) {
  const { navigation, route } = props as ICheckoutAddress;
  const navigationBuyer = useNavigation<BuyerTabScreenProps>();
  const { cartCheckout } = route.params;
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

  // console.log('--- Cart Checkout ---', cartCheckout);

  const paisData = useMemo(
    () => [
      { nome: 'Angola', id: 'Angola' },
      { nome: 'Brasil', id: 'Brasil' },
      { nome: 'Portugal', id: 'Portugal' },
    ],
    []
  );

  const { user, updateUser, setLoading } = useAuth();
  const [paisValue, setPaisValue] = useState(
    user.endereco?.pais?.toString() || ''
  );

  const {
    values,
    handleChange,
    submitForm,
    errors,
    isValid,
    validateForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      rua: user.endereco?.rua?.toString() || '',
      numero: user.endereco?.numero?.toString() || '',
      bairro: user.endereco?.bairro?.toString() || '',
      cidade: user.endereco?.cidade?.toString() || '',
      estado: user.endereco?.estado?.toString() || '',
      cep: user.endereco?.cep?.toString() || '',
      pais: user.endereco?.pais?.toString() || '',
      complemento: user.endereco?.complemento?.toString() || '',
    },
    validationSchema: Yup.object({
      bairro: Yup.string().required('Campo obrigatório'),
      cep: Yup.string().required('Campo obrigatório'),
      cidade: Yup.string().required('Campo obrigatório'),
      estado: Yup.string().required('Campo obrigatório'),
      numero: Yup.string().required('Campo obrigatório'),
      pais: Yup.string().required('Campo obrigatório'),
      rua: Yup.string().required('Campo obrigatório'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (submittedValues: any) => {
      setLoading(true);
      const endereco: IEndereco = {
        bairro: submittedValues.bairro,
        cep: submittedValues.cep,
        cidade: submittedValues.cidade,
        estado: submittedValues.estado,
        numero: submittedValues.numero,
        pais: submittedValues.pais,
        rua: submittedValues.rua,
        complemento: submittedValues.complemento,
      };

      const addressInfo = [
        'rua',
        'numero',
        'bairro',
        'cidade',
        'estado',
      ];
      const destinations = addressInfo
        .map((item) => submittedValues[item])
        .toString()
        .replace(/\s/g, '+');

      const origins = cartCheckout.map((productInfo: any) =>
        addressInfo
          .map((item) => productInfo.enderecoLoja[item])
          .toString()
          .replace(/\s/g, '+')
      );
      // console.log(' -- *»»»» 🐜 origins: ', origins, ' -- *»»»» 🐜 destinations: ', destinations);
      const info = `&origins=${origins.join(
        '|'
      )}&destinations=${destinations}`.replace(/\s/g, '+');
      console.log(' -- *»»»» 🐜 [info]: ', info);

      const { data: googleMapsResponse } =
        await google.get<IMapsApiResponse>(info);

      console.log(
        ' -- *»»»» COOL LIKE COOLIER 🐜 [googleMapsResponse]: ',
        googleMapsResponse
      );

      if (googleMapsResponse.status !== 'OK') {
        setModalState({
          ...modalState,
          title: 'Oops!',
          description: 'Não pudemos finalizar a operação.',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
            navigation.goBack('Cart');
            setLoading(false);
          },
        });
      }

      const cartUpdateedAddress = cartCheckout.map((key, index) => {
        const r = {
          ...key,
          distanciaEntrega: '',
          enderecoEntrega: {},
          formaPagamento: '',
        };
        r.distanciaEntrega = handleDistance(
          googleMapsResponse.rows[index].elements[0].distance.text
        );
        r.enderecoEntrega = endereco;
        const { enderecoLoja, ...rest } = r;
        return rest;
      });

      await updateUser({ ...user, endereco });

      const vlTotal = cartUpdateedAddress.reduce(
        (accumulator, item) =>
          Math.floor((item.vlPago + accumulator) * 100) / 100,
        0
      );

      const cartCheckoutUpdated = {
        compradorId: user.id,
        compras: cartUpdateedAddress,
        vlTotal,
        formaPagamento: 'CARTAO_DEBITO',
      };

      try {
        console.log('🥪 BEFORE »» Taxa de Entrega: ');

        const ResponseShippingCalc = await api.post(
          'api/compras/v1/calculeFrete',
          cartCheckoutUpdated
        );
        const taxaEntrega = ResponseShippingCalc.data.data;

        console.log('🥪 »» Taxa de Entrega: ', taxaEntrega);

        navigationBuyer.navigate('CheckoutConfirm', {
          taxaEntrega,
          cartCheckoutUpdated,
        });
        setLoading(false);
      } catch (e: any) {
        errorHandler(e, 'api/compras/v1/calculeFrete', (message) => {
          setModalState({
            ...modalState,
            title: 'Oops!',
            description: message as string,
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
              setLoading(false);
            },
          });
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    if (!isValid) {
      setModalState({
        ...modalState,
        title: 'Oops!',
        description: 'Verifique os seus dados e tente novamente',
        isVisible: true,
        messageType: MessageTypes.FAIL,
        handleContinue: () => {
          setModalState({ ...modalState, isVisible: false });
        },
      });
    } else {
      submitForm();
    }
  }, []);

  return (
    <Container scrollEnabled>
      <Form>
        <Title fontSize="20px">Endereço para entrega</Title>
        <SelectList
          name="pais"
          data={paisData}
          value={paisValue}
          label="País"
          error={errors}
          handleChange={(selected: any) => {
            setPaisValue(selected.value);
            values.pais = selected.value;
          }}
        />
        {!!paisValue && (
          <TextInput
            label="Código Postal/CEP"
            errors={errors}
            name="cep"
            handleChange={handleChange}
            values={values}
            mode="outlined"
            keyboardType="numeric"
            onBlur={async () =>
              await (paisValue === 'Brasil' &&
                handlerCEP(
                  values,
                  setLoading,
                  validateForm,
                  setFieldValue
                ))
            }
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Logradouro"
            errors={errors}
            name="rua"
            handleChange={handleChange}
            values={values}
            mode="outlined"
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Número"
            errors={errors}
            name="numero"
            handleChange={handleChange}
            values={values}
            mode="outlined"
            keyboardType="numeric"
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Complemento"
            errors={errors}
            name="complemento"
            handleChange={handleChange}
            values={values}
            mode="outlined"
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Bairro"
            errors={errors}
            name="bairro"
            handleChange={handleChange}
            values={values}
            mode="outlined"
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Cidade"
            errors={errors}
            name="cidade"
            handleChange={handleChange}
            values={values}
            mode="outlined"
          />
        )}
        {!!paisValue && (
          <TextInput
            label="Estado/Província/Região"
            errors={errors}
            name="estado"
            handleChange={handleChange}
            values={values}
            mode="outlined"
          />
        )}
        <Button backgroundColor='#2bc17e' onPress={handleSubmit}>Confirmar dados</Button>
      </Form>

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
