import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../../components/Button';

import { Container } from './styles';
import { type BuyerTabScreenProps } from '../../../types/navigation';

export const User: React.FC = () => {
  const navigation = useNavigation<BuyerTabScreenProps>();

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
          navigation.navigate('Orders');
        }}
      >
        Meus Pedidos
      </Button>
    </Container>
  );
};
