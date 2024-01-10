import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserCard } from '../../../components/UserCard';

import { Container } from './styles';
import { type RegisterTabScreenProps } from '../../../types/navigation';

export const SelectUserType: React.FC = () => {
  const navigation = useNavigation<RegisterTabScreenProps>();

  return (
    <Container>
      <UserCard
        title="Vendedor"
        description="Cadastre-se como vendedor"
        icon="apple-alt"
        onPress={() => {
          navigation.navigate('SignUp', { profile: 'seller' });
        }}
        // background="hsla(50, 96%, 48%, 0.5)"
      />
      <UserCard
        title="Comprador"
        description="Cadastre-se como comprador"
        icon="shopping-cart"
        onPress={() => {
          navigation.navigate('SignUp', { profile: 'buyer' });
        }}
        // background="hsla(28, 96%, 48%, 0.5)"
      />
      <UserCard
        title="Motorista"
        description="Cadastre-se como motorista"
        icon="truck"
        onPress={() => {
          navigation.navigate('SignUp', { profile: 'driver' });
        }}
        // background="hsla(66, 100%, 36%, 0.5)"
      />
    </Container>
  );
};
