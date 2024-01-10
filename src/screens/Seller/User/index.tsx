import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../../components/Button';

import { Container } from './styles';
import { type SellerTabScreenProps } from '../../../types/navigation';

export const User: React.FC = () => {
  const navigation = useNavigation<SellerTabScreenProps>();

  return (
    <Container>
      <Button
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        Meus Dados
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('BankData');
        }}
      >
        Dados Bancários
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('SalesHistory');
        }}
      >
        Histórico de Vendas
      </Button>
    </Container>
  );
};
