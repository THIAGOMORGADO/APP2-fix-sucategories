import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Title } from '../../../components/Title';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { api } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  Description,
  Form,
  FieldWrapper,
  BtnWrapper,
} from './styles';
import { errorHandler } from '../../../utils/errorInstance';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface INewPassword {
  values: {
    newPassword: string;
    confirmation: string;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  submitForm: () => Promise<void>;
  errors: any;
}

export const NewPassword: React.FC = () => {
  const { updateUser, user } = useAuth();
  const [modalState, setModalState] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
    messageType: MessageTypes;
  }>({
    title: '',
    description: '',
    messageType: MessageTypes.INFORMATION,
    isVisible: false,
  });

  const { values, handleChange, submitForm, errors, isValid } =
    useFormik({
      initialValues: {
        newPassword: '',
        confirmation: '',
      },
      validationSchema: Yup.object({
        newPassword: Yup.string().required('Campo obrigatório'),
        confirmation: Yup.string().required('Campo obrigatório'),
      }),
      onSubmit: async (submittedValues) => {
        if (
          submittedValues.newPassword !== submittedValues.confirmation
        ) {
          setModalState({
            title: 'Oops!',
            description: 'As senhas não coincidem. Tente novamente',
            isVisible: true,
            messageType: MessageTypes.FAIL,
          });

          return false;
        }
        try {
          await api.put(
            '/api/user/v1/alterPassword',
            submittedValues
          );
          await updateUser({ ...user, alterPassword: false });
          setModalState({
            title: 'Feito.',
            description: 'Senha alterada com sucesso',
            isVisible: true,
            messageType: MessageTypes.SUCCESS,
          });

          return true;
        } catch (e) {
          errorHandler(e, false, (message) => {
            setModalState({
              title: 'Algo deu errado',
              description: message as string,
              isVisible: true,
              messageType: MessageTypes.FAIL,
            });
          });
        }
        return false;
      },
    });

  const handleSubmit = useCallback(() => {
    if (!isValid) {
      setModalState({
        title: 'Ooops!',
        description: 'Verifique os seus dados e tente novamente',
        isVisible: true,
        messageType: MessageTypes.FAIL,
      });
    } else {
      submitForm();
    }
  }, []);

  return (
    <Container>
      <Form>
        <Title fontSize="20px">Senha Provisória</Title>
        <Description>
          Entre com uma nova senha para o E-mail:
          {'email' in user ? user.email : null}
        </Description>
        <FieldWrapper>
          <TextInput
            label="Insira uma nova senha"
            errors={errors}
            icon="lock"
            name="newPassword"
            handleChange={handleChange}
            values={values}
          />
          <TextInput
            label="Repita a nova senha"
            errors={errors}
            icon="lock"
            name="confirmation"
            handleChange={handleChange}
            values={values}
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
        handleContinue={() => {
          setModalState({
            ...modalState,
            isVisible: false,
          });
        }}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </Container>
  );
};
