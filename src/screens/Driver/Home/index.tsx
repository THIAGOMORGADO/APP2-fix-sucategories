import React from 'react';
import { useAuth } from '../../../hooks/auth';
import { MenuBar } from '../../../components/MenuBar';
import { IntroDriver } from '../../Welcome/IntroDriver';
import { useNavigation } from '@react-navigation/native';
import { DriverTabs } from '../routes';

import { Container } from './styles';
import { NewPassword } from '../../Welcome/NewPassword';

export const DriverHome: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  return user.intro === false ? (
    <Container>
      <MenuBar navigation={navigation} signOut={signOut} />
      <DriverTabs />
    </Container>
  ) : user.alterPassword ? (
    <NewPassword />
  ) : (
    <IntroDriver />
  );
};
