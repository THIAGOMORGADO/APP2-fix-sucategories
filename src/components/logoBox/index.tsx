import React, { useState } from 'react';
import { logoNotFound } from '../../constants/imgNotFound';
import { useAuth } from '../../hooks/auth';

import { Container, Image } from './styles';

const handleLogo = (img: string) => {
  const def = [
    'https://fieldrightapi.herokuapp.com/images/',
    'https://fieldrightapi.herokuapp.com/images/',
  ];

  return def.some((d) => d === img) ? logoNotFound : img;
};

export const LogoBox: React.FC = ({ children }) => {
  const { user } = useAuth();
  const logo = handleLogo(user.avatar);
  const [hash, setHash] = useState(Date.now());

  return (
    <Container>
      <Image source={{ uri: `${logo}?${Date.now()}` }} />
      {children}
    </Container>
  );
};
