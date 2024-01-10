import React from 'react';
import { IntroScreen } from '../../../components/IntroScreen';
import { Logo } from '../../../components/IntroScreen/styles';
import { useAuth } from '../../../hooks/auth';

export const IntroBuyer: React.FC = () => {
  const { updateUser, user } = useAuth();

  const introScreens = [
    {
      img: (
        <Logo
          source={require('../../../../assets/images/upstairs.png')}
          height={0.513333333}
        />
      ),
      title: `Bem-vindo(a)
            Field Right`,
      description: `Passo a passo você se sentirá mais confortável e perceberá que a FIELD RIGHT também é sua casa. 
      Aqui aproximamos o vendedor e o consumidor final.`,
    },
  ];

  return (
    <IntroScreen
      screens={introScreens}
      btnFinish={async () => {
        await updateUser({ ...user, intro: false });
      }}
    />
  );
};
