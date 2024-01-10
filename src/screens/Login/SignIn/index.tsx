import React, { type FC, useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';

import {
  Container,
  TextWrapper,
  Img,
  Form,
  CheckLinkWrap,
  ForgotPass,
  ForgotPassText,
  GoSignUp,
  GoSignUpText,
  Green,
  Divisor,
  Title,
} from './styles';

import { errorHandler } from '../../../utils/errorInstance';
import {
  type AuthTabScreenProps,
  type WelcomeTabScreenProps,
} from '../../../types/navigation';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

const LOGIN_LOGO = require('../../../../assets/images/login.png');

export const SignIn: FC = () => {
  const navigation = useNavigation<WelcomeTabScreenProps>();
  const authNavigation = useNavigation<AuthTabScreenProps>();
  const { signIn, loading, setLoading } = useAuth();
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

  // setLoading(false)

  const { values, handleChange, submitForm, errors, isValid } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string().required('Required'),
      }),
      onSubmit: (submittedValues) => {
        signIn(submittedValues)
          .catch((error) =>
            errorHandler(error, true, (message) => {
              setModalState({
                ...modalState,
                title: 'Algo deu errado',
                description: message as string,
                isVisible: true,
                messageType: MessageTypes.FAIL,
                handleContinue: () => {
                  setModalState({ ...modalState, isVisible: false });
                },
              });
            })
          )
          .finally(() => {
            setLoading(false);
          });
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
              <Divisor>
                <TextWrapper>
                  <Title fontSize="24px" fontWeight={400}>
                    Bem-vindo
                  </Title>
                  <Title fontSize="24px" fontWeight={400}>
                    a
                  </Title>
                  <Title>Field Right</Title>
                </TextWrapper>
              </Divisor>
              <Img source={LOGIN_LOGO} resizeMode="cover" />

              <Form>
                <TextInput
                  label="E-mail"
                  errors={errors}
                  icon="email"
                  name="email"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="email-address"
                />
                <TextInput
                  label="Senha"
                  errors={errors}
                  icon="lock"
                  name="password"
                  handleChange={handleChange}
                  values={values}
                />
                <CheckLinkWrap>
                  <ForgotPass
                    onPress={() => {
                      authNavigation.navigate('ForgotPassword');
                    }}
                  >
                    <ForgotPassText>Esqueceu a senha?</ForgotPassText>
                  </ForgotPass>
                </CheckLinkWrap>
                <Button
                backgroundColor='#2bc17e'
                  disabled={loading}
                  onPress={() => {
                    !loading
                      ? handleSubmit()
                      : alert('Aguarde... Fazendo login');
                  }}
                >
                  {!loading ? 'ENTRAR' : 'ENTRANDO...'}
                </Button>
                <GoSignUp
                  onPress={() => {
                    navigation.navigate('SelectUserType');
                  }}
                >
                  <GoSignUpText>
                    {'Já tem uma conta? '}
                    <Green>Criar uma conta</Green>
                  </GoSignUpText>
                </GoSignUp>
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
