import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { IntroSeller } from '../../Welcome/IntroSeller';

import { SellerTabs } from '../routes';
import { NewPassword } from '../../Welcome/NewPassword';

import { Container } from './styles';
import { MenuBar } from '../../../components/MenuBar';

export const SellerHome: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  if (user.intro === false) {
    return (
      <Container>
        <MenuBar navigation={navigation} signOut={signOut} />
        <SellerTabs />
      </Container>
    );
  }

  if (user.alterPassword) {
    return <NewPassword />;
  }

  return <IntroSeller />;
};
