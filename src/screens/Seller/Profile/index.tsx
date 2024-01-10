import React, { useCallback, useMemo, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../../components/TextInput';
import { SelectList } from '../../../components/SelectList';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import validations from '../../../utils/Validations';
import { Container, Form, Text } from './styles';
import { api } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import { colors } from '../../../constants/colors';
import { ImagePicker } from '../../../components/ImagePicker';
import { LogoBox } from '../../../components/logoBox';
import { Checkbox } from '../../../components/Checkbox';
import { handleCpfCnpjNif } from '../../../utils/handleCpfCnpjNif';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

export const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateUser, signOut } = useAuth();
  const userProfile = user.perfil;
  const [paisValue, setPaisValue] = useState(
    user.endereco?.pais || ''
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

  const paisData = useMemo(
    () => [
      { nome: 'Angola', id: 'Angola' },
      { nome: 'Brasil', id: 'Brasil' },
      { nome: 'Portugal', id: 'Portugal' },
    ],
    []
  );

  const [image, setImage] = useState([] as string[]);

  const cpfcnpjnifNifValidate = (
    value: string | undefined | null
  ) => {
    return !value
      ? userProfile === 'comprador'
      : [
          validations.cpf(value),
          validations.cnpj(value),
          validations.nif(value),
        ].some((item) => !!item);
  };

  const {
    values,
    handleChange,
    submitForm,
    errors,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      cpfcnpjnif: user.cpf || user.cnpj || user.nif || '',
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      perfil: userProfile,
      bairro: user.endereco?.bairro || '',
      cep: user.endereco?.cep || '',
      cidade: user.endereco?.cidade || '',
      estado: user.endereco?.estado || '',
      numero: user.endereco?.numero || '',
      pais: user.endereco?.pais || '',
      rua: user.endereco?.rua || '',
      possuiEntregadores: !!user.possuiEntregadores,
    },
    validationSchema: Yup.object({
      perfil: Yup.string(),
      cpfcnpjnif: Yup.string().when('perfil', {
        is: 'comprador',
        then: Yup.string().nullable(),
        otherwise: Yup.string().test(
          'cpf-cnpj-nif',
          'Documento inválido',
          (value) => cpfcnpjnifNifValidate(value)
        ),
      }),
      email: Yup.string().email('E-mail inválido'),
    }),
    onSubmit: async (values: any) => {
      let {
        cep,
        cidade,
        estado,
        numero,
        pais,
        rua,
        bairro,
        perfil,
        possuiEntregadores,
        ...fields
      }: any = values;

      const endereco = Object.keys({
        cep,
        cidade,
        estado,
        numero,
        pais,
        rua,
        bairro,
      })
        .filter((key) => !!values[key])
        .reduce((obj: any, key: any) => {
          obj[key] = values[key];
          return obj;
        }, {});
      if (Object.keys(endereco).length > 0)
        fields = { ...fields, endereco };

      const apiValues = Object.keys(fields)
        .filter((key: any) => {
          if (key !== 'endereco') !!values[key];
          return true;
        })
        .reduce((obj: any, key: any) => {
          if (key === 'cpfcnpjnif') {
            obj = { ...obj, ...handleCpfCnpjNif(fields.cpfcnpjnif) };
          } else if (key === 'email') {
            if (user.email !== values.email) obj[key] = fields[key];
          } else if (key === 'endereco') {
            obj[key] = endereco;
          } else if (fields[key]) {
            obj[key] = fields[key];
          }
          return obj;
        }, {});
      try {
        await api.put('api/user/v1/update', {
          ...apiValues,
          possuiEntregadores,
          id: user.id,
        });

        const newUser: any = { ...user, possuiEntregadores };

        Object.keys(apiValues).map((key) => {
          if (key !== 'endereco') newUser[key] = apiValues[key];
          else if (
            !Object.keys(newUser).some((key) => key === 'endereco')
          )
            newUser.endereco = endereco;
          else
            Object.keys(apiValues.endereco).map(
              (key) =>
                (newUser.endereco[key] = apiValues.endereco[key])
            );
        });

        updateUser(newUser);

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
      } catch (e: any) {
        const errors = e.response.data.hasOwnProperty('errors')
          ? e.response.data.errors
          : e.response.data.message;
        const message =
          typeof errors === 'string' ? errors : errors.join('. ');
        setModalState({
          ...modalState,
          title: 'Algo deu errado',
          description: message,
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
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
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
              <LogoBox>
                <ImagePicker
                  image={image}
                  setImage={setImage}
                  title="Escolher Logo"
                  autoUpload
                />
              </LogoBox>
              <Form>
                <TextInput
                  label="Primeiro Nome"
                  errors={errors}
                  name="firstName"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
                <TextInput
                  label="Sobrenome"
                  errors={errors}
                  name="lastName"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
                {userProfile !== 'comprador' && (
                  <TextInput
                    label="CPF/CNPJ/NIF/BI"
                    errors={errors}
                    name="cpfcnpjnif"
                    handleChange={handleChange}
                    values={values}
                    keyboardType="numeric"
                    theme="flat"
                  />
                )}
                <TextInput
                  label="E-mail"
                  errors={errors}
                  name="email"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                  keyboardType="email-address"
                />
                <SelectList
                  name="pais"
                  data={paisData.map((item) => ({
                    nome: item.nome,
                    id: item.nome,
                  }))}
                  value={paisValue}
                  label="País"
                  error={errors}
                  handleChange={(selected: any) => {
                    setPaisValue(selected.value);
                    values.pais = selected.value;
                  }}
                />
                <TextInput
                  label="Código Postal/CEP"
                  errors={errors}
                  name="cep"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Logradouro"
                  errors={errors}
                  name="rua"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
                <TextInput
                  label="Número"
                  errors={errors}
                  name="numero"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Bairro"
                  errors={errors}
                  name="bairro"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
                <TextInput
                  label="Cidade"
                  errors={errors}
                  name="cidade"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
                <TextInput
                  label="Estado/Província/Região"
                  errors={errors}
                  name="estado"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                />
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
                  Eu mesmo gerenciarei minhas entregas{' '}
                  <Text
                    highLight
                    onPress={() => {
                      navigation.navigate({ key: 'Entrega' });
                    }}
                  >
                    (saiba mais)
                  </Text>
                </Checkbox>
                <Button onPress={handleSubmit}>Salvar</Button>
                <Button
                  onPress={() => {
                    signOut(user.id || 1);
                  }}
                  backgroundColor={colors.default.red}
                >
                  Sair
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
