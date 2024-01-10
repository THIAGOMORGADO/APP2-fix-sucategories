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
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { TextInput } from '../../../components/TextInput';
import { SelectList } from '../../../components/SelectList';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import validations from '../../../utils/Validations';
import { Container, Form } from './styles';
import { api, ibge } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import { type User } from '../../../@types';
import { handleCpfCnpjNif } from '../../../utils/handleCpfCnpjNif';
import {
  type CidadeAtuacaoType,
  type IIBGEMunicipiosResponse,
} from '../../../@types/city';
import { DRIVER_ENABLED_VEHICLES } from '../../../constants/vehicle';
import { ENABLED_COUNTRIES } from '../../../constants/country';
import { errorHandler } from '../../../utils/errorInstance';
import { MessageModal } from '../../../components/Modals/MessageModal';
import { MessageTypes } from '../../../components/Modals/type';

interface IIBGEResponse {
  id: number;
  nome: string;
  sigla: string;
}

interface SelectedItemType {
  id?: number;
  nome?: string;
}

type SelectDataType = SelectedItemType[];

export const Profile: React.FC = () => {
  const { user, updateUser, setLoading } = useAuth();
  const [tipoVeiculoValue, setTipoVeiculoValue] = useState(
    user.tipoVeiculo || ''
  );
  const [paisValue, setPaisValue] = useState('');
  const [ufData, setUfData] = useState<SelectDataType | []>([]);
  const [ufValue, setUfValue] = useState<number | undefined>();
  const [cidadeData, setCidadeData] = useState<SelectDataType | []>(
    []
  );
  const [cidadeValue, setCidadeValue] = useState<number | undefined>(
    user?.cidadeAtuacao?.codigoMunicipio
  );
  const [allCities, setAllCities] = useState<
    CidadeAtuacaoType[] | []
  >([]);
  const tipoVeiculoDoc = useMemo(
    () => ['CARRO', 'MOTO', 'EMPRESA'],
    []
  );
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
  const tipoVeiculoData = DRIVER_ENABLED_VEHICLES;
  const paisData = ENABLED_COUNTRIES;

  const cpfcnpjnifNifValidate = (
    value: string | undefined | null
  ): boolean => {
    return !value
      ? false
      : [
          validations.cpf(value),
          validations.cnpj(value),
          validations.nif(value),
        ].some((item) => !!item);
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

  const {
    values,
    handleChange,
    submitForm,
    setFieldValue,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      cpfcnpjnif: user.cpf || user.cnpj || user.nif || '',
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tipoVeiculo: user.tipoVeiculo || '',
      renavam: user.renavam || '',
      cnh: user.cnh || '',
      uf: '',
      cidadeAtuacao: user.cidadeAtuacao
        ? {
            id: user.cidadeAtuacao?.codigoMunicipio,
            nome: user.cidadeAtuacao?.nomeMunicipio,
          }
        : undefined,
      pais: '',
    },
    validationSchema: Yup.object({
      cpfcnpjnif: Yup.string().test(
        'cpf-cnpj-nif',
        'CPF inválido',
        (value) => cpfcnpjnifNifValidate(value)
      ),
      email: Yup.string().email('E-mail inválido'),
      emailPagSeguro: Yup.string().email('E-mail PagSeguro inválido'),
      renavam: Yup.string().test(
        'renavam',
        'Renavam inválido',
        (value) => handleRenavam(value || '')
      ),
      cnh: Yup.string().test('cnh', 'CNH inválido', (value) =>
        handleCNH(value || '')
      ),
    }),
    onSubmit: async (submittedValues) => {
      setLoading(true);
      const fields: any = submittedValues;

      const apiValues: User = Object.keys(fields)
        .filter((key) =>
          key === 'email' ? !(values.email === user.email) : true
        )
        .reduce((obj: any, key: any) => {
          let valuesObject = obj;
          if (key === 'cpfcnpjnif') {
            valuesObject = {
              ...obj,
              ...handleCpfCnpjNif(fields.cpfcnpjnif),
            };
          } else if (key === 'cidadeAtuacao') {
            // eslint-disable-next-line prefer-destructuring
            valuesObject[key] = allCities.filter(
              (city) => city?.codigoMunicipio === cidadeValue
            )[0];
          } else if (fields[key]) {
            valuesObject[key] = fields[key];
          }
          return valuesObject;
        }, {});

      try {
        // console.log('[SENDING - submittedValues]: ', apiValues);
        // setLoading(false);
        // return;
        await api.put('api/user/v1/update', {
          ...apiValues,
          id: user.id,
        });

        updateUser({
          ...user,
          ...apiValues,
        });

        setModalState({
          ...modalState,
          title: 'Feito!',
          description: 'Dados alterados com sucesso',
          isVisible: true,
          messageType: MessageTypes.SUCCESS,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      } catch (e) {
        errorHandler(
          e,
          `[api/user/v1/update]: ${submittedValues.email}`,
          (errorMessage) => {
            setModalState({
              ...modalState,
              title: 'Algo deu errado!',
              description: errorMessage as string,
              isVisible: true,
              messageType: MessageTypes.FAIL,
              handleContinue: () => {
                setModalState({ ...modalState, isVisible: false });
              },
            });
          }
        );
      }
      setLoading(false);
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

  useEffect(() => {
    (async () => {
      if (paisValue === 'BRA') {
        setLoading(true);
        try {
          const { data: IBGEResponse } = await ibge.get<
            IIBGEResponse[]
          >('localidades/estados');
          const returnedStates = IBGEResponse.map(({ nome, id }) => ({
            nome,
            id,
          }));
          setUfData(returnedStates);
        } catch (e) {
          setModalState({
            ...modalState,
            title: 'Oops!',
            description:
              'Não conseguimos carregar todas as informações (Estados). Por favor, tente novamente mais tarde.',
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
      if (paisValue === 'BRA') {
        setLoading(true);
        try {
          const { data: IBGEResponse } = await ibge.get<
            IIBGEMunicipiosResponse[]
          >(`localidades/estados/${ufValue}/municipios`);
          const ReturnedCityList = IBGEResponse.map(
            ({ nome, id }) => ({
              nome,
              id,
            })
          );
          const cityList = IBGEResponse.map((city) => ({
            codigoMunicipio: city.id,
            codigoUF: city.microrregiao.mesorregiao.UF.id,
            id: city.microrregiao.mesorregiao.UF.regiao.id,
            nomeMunicipio: city.nome,
            nomeUF: city.microrregiao.mesorregiao.UF.nome,
            pais: 'BRASIL',
            siglaUF: city.microrregiao.mesorregiao.UF.sigla,
          }));
          setAllCities(cityList);
          setCidadeData(ReturnedCityList);
        } catch (e) {
          errorHandler(e, '[IBGEResponse: municipios]', () => {
            setModalState({
              ...modalState,
              title: 'Oops!',
              description:
                'Não conseguimos carregar todas as informações (Municípios). Por favor, tente novamente mais tarde.',
              isVisible: true,
              messageType: MessageTypes.FAIL,
              handleContinue: () => {
                setModalState({ ...modalState, isVisible: false });
              },
            });
          });
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [paisValue, ufValue]);

  useEffect(() => {
    if (user?.cidadeAtuacao?.codigoUF) {
      setUfValue(user?.cidadeAtuacao?.codigoUF);
    }
  }, [user?.cidadeAtuacao]);

  useEffect(() => {
    if (user?.cidadeAtuacao?.codigoMunicipio) {
      setCidadeValue(user?.cidadeAtuacao?.codigoMunicipio);
    }
  }, [user?.cidadeAtuacao]);

  useEffect(() => {
    setPaisValue('BRA');
  }, []);

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
              <Title fontSize="20px">Meu perfil</Title>
              <Form>
                <TextInput
                  label="Primeiro Nome"
                  errors={errors}
                  name="firstName"
                  handleChange={handleChange}
                  values={values}
                />
                <TextInput
                  label="Sobrenome"
                  errors={errors}
                  name="lastName"
                  handleChange={handleChange}
                  values={values}
                />
                <TextInput
                  label="CPF/CNPJ/NIF/BI"
                  errors={errors}
                  name="cpfcnpjnif"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="numeric"
                />
                <TextInput
                  label="E-mail"
                  errors={errors}
                  name="email"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="email-address"
                />
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
                {tipoVeiculoValue !== 'BIKE' && (
                  <TextInput
                    label="Renavam"
                    errors={errors}
                    name="renavam"
                    handleChange={handleChange}
                    values={values}
                    keyboardType="numeric"
                  />
                )}
                {tipoVeiculoValue !== 'BIKE' && (
                  <TextInput
                    label="CNH"
                    errors={errors}
                    name="cnh"
                    handleChange={handleChange}
                    values={values}
                    keyboardType="numeric"
                  />
                )}
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
                <SelectList
                  name="uf"
                  data={ufData}
                  value={ufValue}
                  label="Em qual UF você irá atuar?"
                  error={errors}
                  handleChange={(selected) => {
                    setUfValue(selected.value);
                    setFieldValue('uf', selected.value);
                    // values.uf = selected.value;
                  }}
                />
                <SelectList
                  name="cidadeAtuacao"
                  data={cidadeData}
                  value={cidadeValue}
                  label="E em qual cidade?"
                  error={errors}
                  handleChange={(selected) => {
                    setCidadeValue(selected.value);
                    // eslint-disable-next-line prettier/prettier
                    setFieldValue(
                      'cidadeAtuacao',
                      cidadeData.filter(
                        (city) => city?.id === selected.value
                      )[0]
                    );
                    // values.cidadeAtuacao = selected;
                  }}
                />
                <Button
                  onPress={handleSubmit}
                  backgroundColor="#2bc17e"
                >
                  Salvar
                </Button>
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
