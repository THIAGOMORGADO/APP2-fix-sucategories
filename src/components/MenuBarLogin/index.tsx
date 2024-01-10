import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Container, Logo } from './styles';

export const MenuBarLogin: React.FC = () => {
  return (
    <Container>
      <Logo
        source={require('../../../assets/images/logo-white.png')}
      />
      <FontAwesome5 name="bars" size={36} color="white" />
    </Container>
  );
};
