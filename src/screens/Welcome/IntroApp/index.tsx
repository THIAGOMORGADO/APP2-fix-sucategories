import React from 'react';
import { Button, Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';

import {
  Container,
  LogoWrapper,
  Logo,
  TextWrapper,
  ButtonWrapper,
  GoLink,
  GoLinkText,
  Green,
  Wrapper,
} from './styles';

import { colors } from '../../../constants/colors';
import { type WelcomeTabScreenProps } from '../../../types/navigation';

const LOGO = require('../../../../assets/images/logo.png');

export const IntroApp: React.FC = () => {
  const { navigate } = useNavigation<WelcomeTabScreenProps>();

  return (
    <Container>
      <LogoWrapper>
        <Title fontSize="24px" fontWeight={400}>
          Bem-vindo
        </Title>
        <Title fontSize="24px" fontWeight={400}>
          a
        </Title>
        <Logo source={LOGO} resizeMode="contain" />
      </LogoWrapper>
      <TextWrapper>
        <ButtonWrapper>
          <Button
            label="Cria sua conta"
            // size={Button.sizes.large}
            borderRadius={6}
            backgroundColor={colors.default.green}
            labelStyle={{
              color: Colors.white,
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            style={{ marginVertical: 10, paddingVertical: 14 }}
            onPress={() => {
              navigate('SelectUserType');
            }}
          />

          <Wrapper>
            <GoLink
              onPress={() => {
                navigate('AboutUs', {});
              }}
            >
              <GoLinkText>
                <Green>Quem somos?</Green>
              </GoLinkText>
            </GoLink>
            <GoLink
              onPress={() => {
                navigate('SignInType');
              }}
            >
              <GoLinkText>
                {'Já tem conta ? '}
                <Green>Faça login</Green>
              </GoLinkText>
            </GoLink>
          </Wrapper>
        </ButtonWrapper>
      </TextWrapper>
    </Container>
  );
};
