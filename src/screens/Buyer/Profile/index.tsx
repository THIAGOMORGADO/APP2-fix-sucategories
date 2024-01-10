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
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import { Container, Form } from './styles';
import { api } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
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

  const { values, handleChange, submitForm, errors, isValid } =
    useFormik({
      initialValues: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        perfil: 'comprador',
      },
      validationSchema: Yup.object({
        perfil: Yup.string(),
        email: Yup.string().email('E-mail inválido'),
      }),
      onSubmit: async (values) => {
        const { perfil, ...fields }: any = values;

        const apiValues = Object.keys(fields).reduce(
          (obj: any, key: any) => {
            if (key === 'email') {
              if (user.email !== values.email) obj[key] = fields[key];
            } else if (fields[key]) {
              obj[key] = fields[key];
            }
            return obj;
          },
          {}
        );

        try {
          const response = await api.put('api/user/v1/update', {
            ...apiValues,
            id: user.id,
          });
          const newUser = user;

          updateUser({ ...newUser, ...apiValues });

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
                <TextInput
                  label="E-mail"
                  errors={errors}
                  name="email"
                  handleChange={handleChange}
                  values={values}
                  theme="flat"
                  keyboardType="email-address"
                />
                <Button
                  backgroundColor="#2bc17e"
                  onPress={handleSubmit}
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
