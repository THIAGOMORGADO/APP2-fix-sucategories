import React, { useCallback } from 'react';
import * as Linking from 'expo-linking';
import { handleCEP } from '../../utils/handleCEP';

import {
  Container,
  TextWrapper,
  CommonText,
  CommonInfo,
  AddressTextWrapper,
  BtnMap,
  BtnMapText,
  Icon,
} from './styles';

interface IAddressInfo {
  name: string;
  userType: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    complemento: string;
    estado: string;
  };
}

export const AddressInfo: React.FC<IAddressInfo> = ({
  name,
  endereco,
  userType,
}) => {
  const handleMaps = useCallback((addresses: string[]) => {
    const url = `https://www.google.com/maps/search/${addresses
      .map((address) => address.replace(/\s/, '+'))
      .join(',')}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  }, []);

  return (
    <Container>
      <TextWrapper>
        <CommonText>{`${userType}: `}</CommonText>
      </TextWrapper>
      <TextWrapper>
        <CommonInfo>{name}</CommonInfo>
      </TextWrapper>
      <AddressTextWrapper>
        <CommonInfo>{`${endereco.rua}, ${endereco.numero}`}</CommonInfo>
      </AddressTextWrapper>
      <AddressTextWrapper>
        <CommonInfo>{`${endereco.bairro}, ${endereco.cidade}`}</CommonInfo>
      </AddressTextWrapper>
      <AddressTextWrapper>
        <CommonInfo>{handleCEP(endereco.cep || '')}</CommonInfo>
      </AddressTextWrapper>
      <AddressTextWrapper>
        <CommonInfo>{endereco.complemento || '-'}</CommonInfo>
      </AddressTextWrapper>
      <BtnMap
        onPress={() => {
          handleMaps([
            endereco.rua || '',
            endereco.numero || '',
            endereco.bairro || '',
            endereco.cidade || '',
            endereco.estado || '',
          ]);
        }}
      >
        <Icon name="location-pin" />
        <BtnMapText>Abrir no mapa</BtnMapText>
      </BtnMap>
    </Container>
  );
};
