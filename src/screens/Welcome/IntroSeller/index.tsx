import React from 'react';
import { IntroScreen } from '../../../components/IntroScreen';
import { Logo } from '../../../components/IntroScreen/styles';
import { useAuth } from '../../../hooks/auth';

export const IntroSeller: React.FC = () => {
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
      // description: `Field Right é uma Plataforma comercial que conecta agricultor e consumidor final em Florianópolis.
      //   Temos disponibilidade de negociar o transporte de entrega também.`
      description: `Passo a passo você se sentirá mais confortável e perceberá que a FIELD RIGHT também é sua casa.
      Aqui aproximamos o vendedor e o consumidor final.`,
    },
    {
      img: (
        <Logo
          source={require('../../../../assets/images/scooter.png')}
          height={0.513333333}
        />
      ),
      title: 'Faça o registro do seu produto',
      // description: `Cadastre o seu produto e anuncie para milhares de pessoas de forma rápida e prática.`
      description: `Cadastre o seu produto e anunciem para milhares de pessoas de forma rápida e prática com a Field Right, e faça parte de um mercado seguro e lucrativo.`,
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
