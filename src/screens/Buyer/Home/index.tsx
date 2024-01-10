import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../hooks/auth';
import { MenuBar } from '../../../components/MenuBar';
import { IntroBuyer } from '../../Welcome/IntroBuyer';
import { BuyerTabs } from '../routes';
import { NewPassword } from '../../Welcome/NewPassword';

import { Container } from './styles';

export const BuyerHome: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  return user.intro === false ? (
    <Container>
      <MenuBar navigation={navigation} signOut={signOut} />
      <BuyerTabs />
    </Container>
  ) : user.alterPassword ? (
    <NewPassword />
  ) : (
    <IntroBuyer />
  );
};
