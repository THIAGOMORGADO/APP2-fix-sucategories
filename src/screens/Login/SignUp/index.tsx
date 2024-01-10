import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Cellular from 'expo-cellular';
import { useNavigation } from '@react-navigation/native';
import { Picker, PickerModes } from 'react-native-ui-lib';
import _ from 'lodash';
import { HelperText } from 'react-native-paper';
import { Title } from '../../../components/Title';
import { TextInput } from '../../../components/TextInput';
import { Checkbox } from '../../../components/Checkbox';
import { SelectList } from '../../../components/SelectList';
import { Button } from '../../../components/Button';
import validations from '../../../utils/Validations';
import { Container, Text, Form, Error } from './styles';
import { api, ibge } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import { type CategoryResponseType } from '../../../@types/category';
import { type WelcomeTabScreenProps } from '../../../types/navigation';
import Axios from 'axios';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface ISignUp {
  route: {
    params: {
      profile: 'buyer' | 'driver' | 'seller';
    };
  };
}

interface IIBGEResponse {
  id: number;
  nome: string;
  sigla: string;
}

interface ISelectData {
  id: string;
  nome: string;
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
type CategoriesDataType = Array<{ id: number; nome: string }>;

export const SignUp: React.FC<ISignUp> = ({ route }) => {
  const { setLoading } = useAuth();
  const navigation = useNavigation<WelcomeTabScreenProps>();
  const userProfile = route.params.profile;
  const [tipoVeiculoValue, setTipoVeiculoValue] = useState('');
  const [paisValue, setPaisValue] = useState('');
  const [categoriesData, setCategoriesData] =
    useState<CategoriesDataType>([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [ufData, setUfData] = useState([] as ISelectData[]);
  const [cidadeData, setCidadeData] = useState([] as ISelectData[]);
  const [ufValue, setUfValue] = useState('');
  const [cidadeValue, setCidadeValue] = useState('');
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

  useEffect(() => {
    (async () => {
      values.country = paisValue;
      if (userProfile === 'driver' && paisValue === 'BRA') {
        setLoading(true);
        try {
          const response: IIBGEResponse[] = await (
            await ibge.get('localidades/estados')
          ).data;
          setUfData(
            response.map(({ nome, id }) => ({
              nome,
              id: id.toString(),
            }))
          );
        } catch (e) {
          setModalState({
            ...modalState,
            title: 'Oops!',
            description: `Não conseguimos carregar todas as informações necessárias para o seu cadastro. Por favor,
            tente novamete mais tarde.`,
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
            },
          });
        }
        setLoading(false);
      }
    })();
  }, [paisValue]);

  useEffect(() => {
    (async () => {
      if (userProfile === 'driver' && paisValue === 'BRA') {
        setLoading(true);
        try {
          const { data } = await ibge.get<IIBGEResponse[]>(
            `localidades/estados/${ufValue}/municipios`
          );
          setCidadeData(
            data.map(({ nome, id }) => ({ nome, id: id.toString() }))
          );
        } catch (e) {
          setModalState({
            ...modalState,
            title: 'Oops!',
            description: `Não conseguimos carregar todas as informações necessárias para o seu cadastro. Por favor,
            tente novamete mais tarde.`,
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
            },
          });
        }
        setLoading(false);
      }
    })();
  }, [ufValue]);

  useEffect(() => {
    (async () => {
      try {
        const { data: categoryData } =
          await api.get<CategoryResponseType>(
            '/api/superCategory/v1'
          );
        setCategoriesData(
          categoryData.data.content.map((category) => ({
            nome: category.nome,
            id: category.id,
          }))
        );
      } catch (e) {}
    })();
  }, []);

  const userProfileOptions = useMemo(
    () => ({
      seller: 'vendedor',
      driver: 'motorista',
      buyer: 'comprador',
    }),
    []
  );

  const tipoVeiculoData = useMemo(
    () => [
      { nome: 'Bicicleta', id: 'BIKE' },
      { nome: 'Carro', id: 'CARRO' },
      { nome: 'Moto', id: 'MOTO' },
      { nome: 'Empresarial', id: 'EMPRESA' },
    ],
    []
  );

  const tipoVeiculoDoc = useMemo(
    () => ['CARRO', 'MOTO', 'EMPRESA'],
    []
  );

  const paisData = [
    { nome: 'Angola', id: 'AGO' },
    { nome: 'Brasil', id: 'BRA' },
    { nome: 'Portugal', id: 'POR' },
  ];

  const cpfcnpjnifNifValidate = (
    value: string | undefined | null
  ): boolean => {
    return !value
      ? userProfile === 'buyer'
      : [
          validations.cpf(value),
          validations.cnpj(value),
          validations.nif(value),
        ].some((item) => !!item);
  };
  const yourPhoneNumberValidationLogic = (value) => {
    // Formate o número de telefone
    const formattedPhone = formatPhone(value);

    // Verifique se o número de telefone formatado segue o padrão (99)99999-9999
    const phoneNumberPattern = /^\(\d{2}\)\d{5}-\d{4}$/;
    if (!phoneNumberPattern.test(formattedPhone)) {
      return false; // Retorna falso se não corresponder ao padrão desejado
    }

    return true; // Retorna verdadeiro se o número for válido
  };

  const formatPhone = (phoneNumber) => {
    // Remova todos os caracteres não numéricos
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Aplique a máscara (99)99999-9999
    const formattedPhoneNumber = numericPhoneNumber.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1)$2-$3'
    );

    return formattedPhoneNumber;
  };

  const handleRenavam = useCallback(
    (value: string | undefined) => {
      if (tipoVeiculoDoc.every((tipo) => tipo !== tipoVeiculoValue))
        return true;
      if (value) return validations.renavam(value);
      return false;
    },
    [tipoVeiculoDoc, tipoVeiculoValue]
  );

  const handleCNH = useCallback(
    (value: string | undefined) => {
      if (tipoVeiculoDoc.every((tipo) => tipo !== tipoVeiculoValue))
        return true;
      if (value) return value.length === 11;
      return false;
    },
    [tipoVeiculoDoc, tipoVeiculoValue]
  );

  const { isoCountryCode } = Cellular;
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
      const { bairro, logradouro, uf, localidade } = CEPResponse;

      // Atualize os valores diretamente uma vez, em vez de usar um loop
      setFieldValue('rua', logradouro, true);
      setFieldValue('bairro', bairro, true);
      setFieldValue('cidade', localidade, true);
      setFieldValue('estado', uf, true);

      validateForm(); // Chame apenas uma vez após a atualização dos valores
    } catch (e: unknown) {
      // Trate o erro de acordo com suas necessidades
    }
    setLoading(false);
  };

  const {
    values,
    handleChange,
    submitForm,
    errors,
    setFieldValue,
    validateForm,
    isValid,
  } = useFormik({
    initialValues: {
      country: isoCountryCode === 'br' ? 'BRA' : 'AGO',
      cpfOrcnpj: '',
      phone: '',
      categoria: '',
      email: '',
      firstName: '',
      lastName: '',
      perfil: userProfileOptions[userProfile],
      eighteen: false,
      tipoVeiculo: '',
      renavam: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      numero: '',
      pais: '',
      rua: '',
      cnh: '',
      cidadeAtuacao: '',
      uf: '',
      possuiEntregadores: false,
    },
    validationSchema: Yup.object({
      categoria: Yup.number().when('perfil', {
        is: 'vendedor',
        then: () =>
          Yup.number().required(
            'Selecione uma categoria para a loja.'
          ),
      }),
      email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      firstName: Yup.string().required('Campo obrigatório'),
      lastName: Yup.string().required('Campo obrigatório'),
      eighteen: Yup.boolean().oneOf(
        [true],
        'Você precisa ter 18 anos ou mais para se cadastrar'
      ),
      phone: Yup.string().required('Campo obrigatório'),

      renavam: Yup.string().when('perfil', {
        is: 'motorista',
        then: () =>
          Yup.string().test(
            'renavam',
            'Documento inválido',
            (value) => handleRenavam(value)
          ),
      }),
      cnh: Yup.string().when('perfil', {
        is: 'motorista',
        then: () =>
          Yup.string().test('cnh', 'Documento inválido', (value) =>
            handleCNH(value)
          ),
      }),
      tipoVeiculo: Yup.string().when('perfil', {
        is: 'motorista',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      bairro: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      cep: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      cidade: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),

      estado: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      numero: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      pais: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      uf: Yup.string().when('perfil', {
        is: 'motorista',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      cidadeAtuacao: Yup.string().when('perfil', {
        is: 'motorista',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
      rua: Yup.string().when('perfil', {
        is: 'vendedor',
        then: () => Yup.string().required('Campo obrigatório'),
      }),
    }),
    onSubmit: async (submittedValues) => {
      setLoading(true);
      const {
        cep,
        cidade,
        estado,
        numero,
        pais,
        rua,
        bairro,
        possuiEntregadores: entrega,
        phone,
        ...fields
      }: any = submittedValues;

      const formattedPhone = formatPhone(phone);

      const endereco = {
        cep,
        cidade,
        estado,
        numero,
        pais,
        rua,
        bairro,
      };
      const formFields = { ...fields, endereco };
      const usersFields = {
        buyer: [
          'firstName',
          'lastName',
          'email',
          'perfil',
          'cpfOrcnpj',
          'phone',
        ],
        driver: [
          'firstName',
          'lastName',
          'email',
          'renavam',
          'phone',
          'cpfOrcnpj',
          'tipoVeiculo',
          'country',
          'perfil',
          'cnh',
          'cidadeAtuacao',
        ],
        seller: [
          'firstName',
          'lastName',
          'email',
          'endereco',
          'cpfOrcnpj',
          'phone',
          'perfil',
          'country',
          'categoria',
        ],
      };

      const apiValues = Object.keys(formFields)
        .filter((key) => {
          if (['cnh', 'renavam'].some((item) => item === key))
            return tipoVeiculoDoc.some(
              (tipo) => tipo === tipoVeiculoValue
            );
          return usersFields[userProfile].includes(key);
        })
        .reduce((obj: any, key: any) => {
          const newApIValuesObject = obj;
          if (key === 'cpfOrcnpj') {
            const cpfcnpjnif = formFields.cpfOrcnpj;
            // eslint-disable-next-line no-unused-expressions
            cpfcnpjnif.length === 11
              ? (obj.cpfOrcnpj = cpfcnpjnif)
              : cpfcnpjnif.length === 14
                ? (obj.cpfOrcnpj = cpfcnpjnif)
                : (obj.cpfOrcnpj = cpfcnpjnif);
          } else if (key === 'cidadeAtuacao') {
            newApIValuesObject[key] = {
              pais: 'BRA', // País (Brasil)
              codigoUF: ufValue, // Código do estado
              siglaUF: '', // Sigla do estado (por exemplo, SP)
              nomeUF: '', // Nome do estado (por exemplo, São Paulo)
              codigoMunicipio: cidadeData.filter(
                (i) => i.id === cidadeValue
              )[0].id, // Código do município
              nomeMunicipio: cidadeData.filter(
                (i) => i.id === cidadeValue
              )[0].nome, // Nome do município
            };
          } else {
            newApIValuesObject[key] = formFields[key];
          }
          return newApIValuesObject;
        }, {});

      try {
        const r = await api.post(
          'api/user/v1/singUp',
          userProfile === 'buyer'
            ? { ...apiValues, phone: formattedPhone }
            : {
                ...apiValues,
                possuiEntregadores: entrega,
                phone: formattedPhone,
              }
        );

        if (r.data.status == 'OK') {
          setModalState({
            ...modalState,
            title: 'Conta criada com sucesso',
            description:
              'Enviamos um e-mail com a sua senha temporária. Não esqueça de conferir também sua caixa de SPAM.',
            isVisible: true,
            messageType: MessageTypes.SUCCESS,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
              navigation.navigate('SignInType');
              setLoading(false);
            },
          });
        } else {
          setLoading(false);
          setModalState({
            ...modalState,
            title: 'Não foi possivel criar conta',
            description: 'Verifique os seus dados',
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
            },
          });
        }
      } catch (e: any) {
        setModalState({
          ...modalState,
          title: 'Algo deu errado',
          description: 'Não foi possivel criar conta',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
            setLoading(false);
          },
        });
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
  }, [isValid, submitForm]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Container>
              <Title fontSize="20px">
                Inscrever-se como
                {' ' + userProfileOptions[userProfile]}
              </Title>
              <Form>
                <TextInput
                  label="Primeiro Nome"
                  errors={errors}
                  name="firstName"
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                />
                <TextInput
                  label="Sobrenome"
                  errors={errors}
                  name="lastName"
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                />

                <TextInput
                  label="CPF/CNPJ"
                  errors={errors}
                  name="cpfOrcnpj"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="numeric"
                  mode="outlined"
                />

                <TextInput
                  label="Número de telefone"
                  errors={errors}
                  name="phone"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="numeric"
                  mode="outlined"
                />
                <TextInput
                  label="E-mail"
                  errors={errors}
                  name="email"
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                  keyboardType="email-address"
                />
                {userProfile === 'driver' && (
                  <SelectList
                    name="tipoVeiculo"
                    data={tipoVeiculoData}
                    value={tipoVeiculoValue}
                    label="Tipo de Veículo"
                    error={errors}
                    handleChange={(selected: any) => {
                      setTipoVeiculoValue(selected.value);
                      values.tipoVeiculo = selected.value;
                    }}
                  />
                )}
                {userProfile === 'driver' &&
                  tipoVeiculoDoc.some(
                    (tipo) => tipo === tipoVeiculoValue
                  ) && (
                    <TextInput
                      label="Renavam"
                      errors={errors}
                      name="renavam"
                      handleChange={handleChange}
                      values={values}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                {userProfile === 'driver' &&
                  tipoVeiculoDoc.some(
                    (tipo) => tipo === tipoVeiculoValue
                  ) && (
                    <TextInput
                      label="CNH"
                      errors={errors}
                      name="cnh"
                      handleChange={handleChange}
                      values={values}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                {userProfile === 'driver' && (
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
                )}
                {userProfile === 'driver' && paisValue !== '' && (
                  <SelectList
                    name="uf"
                    data={ufData}
                    value={ufValue}
                    label="Em qual UF você irá atuar?"
                    error={errors}
                    handleChange={(selected: any) => {
                      setUfValue(selected.value);
                      values.uf = selected.value;
                      console.log(selected.value);
                    }}
                  />
                )}
                {userProfile === 'driver' && ufValue !== '' && (
                  <SelectList
                    name="cidadeAtuacao"
                    data={cidadeData}
                    value={cidadeValue}
                    label="E em qual cidade?"
                    error={errors}
                    handleChange={(selected: any) => {
                      setCidadeValue(selected.value);
                      values.cidadeAtuacao = selected.value;
                    }}
                  />
                )}
                {/* {userProfile === 'seller' && (
                  <SelectList
                    name="category"
                    data={categoriesData}
                    value={categoryValue}

                    label="Categoria da Loja"
                    error={errors}
                    handleChange={(selected: any) => {
                      setCategoryValue(selected.value.id);
                      // values.pais = selected.value;
                    }}
                  />
                )} */}
                {userProfile === 'seller' && (
                  <SelectList
                    name="categoria"
                    data={categoriesData}
                    value={categoryValue}
                    label="Selecione a categoria"
                    error={errors}
                    handleChange={(selected: any) => {
                      setCategoryValue(selected.value);
                      values.categoria = selected.value;
                    }}
                  />
                )}

                {userProfile === 'seller' && (
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
                )}
                {userProfile === 'seller' && paisValue !== '' && (
                  <TextInput
                    label="Código Postal/CEP"
                    errors={errors}
                    name="cep"
                    handleChange={handleChange}
                    values={values}
                    mode="outlined"
                    keyboardType="numeric"
                    onBlur={async () =>
                      await (paisValue === 'BRA' &&
                        handlerCEP(
                          values,
                          setLoading,
                          validateForm,
                          setFieldValue
                        ))
                    }
                  />
                )}
                {userProfile === 'seller' && paisValue !== '' && (
                  <TextInput
                    label="Logradouro"
                    errors={errors}
                    name="rua"
                    handleChange={handleChange}
                    values={values}
                    mode="outlined"
                  />
                )}
                {userProfile === 'seller' && paisValue !== '' && (
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
                {userProfile === 'seller' && paisValue !== '' && (
                  <TextInput
                    label="Bairro"
                    errors={errors}
                    name="bairro"
                    handleChange={handleChange}
                    values={values}
                    mode="outlined"
                  />
                )}
                {userProfile === 'seller' && paisValue !== '' && (
                  <TextInput
                    label="Cidade"
                    errors={errors}
                    name="cidade"
                    handleChange={handleChange}
                    values={values}
                    mode="outlined"
                  />
                )}
                {userProfile === 'seller' && paisValue !== '' && (
                  <TextInput
                    label="Estado/Província/Região"
                    errors={errors}
                    name="estado"
                    handleChange={handleChange}
                    values={values}
                    mode="outlined"
                  />
                )}
                {userProfile === 'seller' && (
                  <Checkbox
                    isChecked={values.possuiEntregadores}
                    onPress={async () =>
                      await setFieldValue(
                        'possuiEntregadores',
                        !values.possuiEntregadores
                      )
                    }
                    errors={errors}
                    name="possuiEntregadores"
                  >
                    {'Eu mesmo gerenciarei minhas entregas '}
                    <Text
                      highLight
                      onPress={() => {
                        navigation.navigate('Entrega');
                      }}
                    >
                      (saiba mais)
                    </Text>
                  </Checkbox>
                )}
                <Checkbox
                  isChecked={values.eighteen}
                  onPress={async () =>
                    await setFieldValue('eighteen', !values.eighteen)
                  }
                  errors={errors}
                  name="eighteen"
                >
                  Tenho 18 anos ou mais
                </Checkbox>
                {userProfile === 'driver' && (
                  <Text highLight={false}>
                    {'Li e me encaixo dentro dos '}
                    <Text
                      highLight
                      onPress={() => {
                        navigation.navigate('DriverTerms');
                      }}
                    >
                      Termos
                    </Text>
                    {' para motoristas'}
                  </Text>
                )}
                <Text highLight={false}>
                  Ao clicar em inscrever-se, você concorda com o
                  seguinte
                  <Text
                    highLight
                    onPress={() => {
                      navigation.navigate('Terms');
                    }}
                  >
                    {' '}
                    {'Termos e Condições '}
                  </Text>
                  {'sem reserva, como também nossa '}
                  <Text
                    highLight
                    onPress={() => {
                      navigation.navigate('Privacy');
                    }}
                  >
                    Política e Privacidade
                  </Text>
                  .
                </Text>
                <Button onPress={handleSubmit}>Inscrever-se</Button>
              </Form>
            </Container>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <MessageModal
        description={modalState.description}
        handleContinue={modalState.handleContinue}
        handleCancel={modalState.handleCancel}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  categorySelector: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 2,
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
