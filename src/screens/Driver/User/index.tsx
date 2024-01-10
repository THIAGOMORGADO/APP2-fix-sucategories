import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../../components/Button';

import { Container } from './styles';
import { type DriverTabScreenProps } from '../../../types/navigation';

export const User: React.FC = () => {
  const navigation = useNavigation<DriverTabScreenProps>();

  return (
    <Container>
      <Button
        backgroundColor="#2bc17e"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        Meus Dados
      </Button>
      <Button
        backgroundColor="#2bc17e"
        onPress={() => {
          navigation.navigate('ChooseStores');
        }}
      >
        Escolher Lojas para Trabalhar
      </Button>
      <Button
        backgroundColor="#2bc17e"
        onPress={() => {
          navigation.navigate('BankData');
        }}
      >
        Dados Bancários
      </Button>
    </Container>
  );
};
