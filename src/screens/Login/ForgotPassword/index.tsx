import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { api } from '../../../config/api';

import {
  Container,
  Description,
  Form,
  FieldWrapper,
  BtnWrapper,
} from './styles';
import { type AuthTabScreenProps } from '../../../types/navigation';
import { errorHandler } from '../../../utils/errorInstance';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

export const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<AuthTabScreenProps>();
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
        email: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      }),
      onSubmit: async (submittedValues) => {
        // console.log(submittedValues)
        // navigation.navigate('IntroBuyer')
        try {
          await api.post(
            `/api/user/v1/forgetPassword?email=${submittedValues.email}`
          );

          Alert.alert(
            'Feito.',
            'Enviamos um novo código de acesso no seu e-mail. Verifique também sua caixa de SPAM.',
            [
              {
                text: 'Ir para login',
                onPress: () => {
                  navigation.navigate('SignIn');
                },
              },
            ],
            { cancelable: false }
          );
        } catch (e) {
          errorHandler(e, 'forgetPassword', (message) => {
            Alert.alert('Algo deu errado', message as string);
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
    <Container>
      <Form>
        <Title fontSize="20px">Redefinição de Senha</Title>
        <Description>
          Digite o seu e-mail para receber uma nova senha
        </Description>
        <FieldWrapper>
          <TextInput
            label="E-mail"
            errors={errors}
            icon="email"
            name="email"
            handleChange={handleChange}
            values={values}
            keyboardType="email-address"
          />
        </FieldWrapper>
        <BtnWrapper>
          <Button onPress={handleSubmit} width={40}>
            Enviar
          </Button>
        </BtnWrapper>
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
};
