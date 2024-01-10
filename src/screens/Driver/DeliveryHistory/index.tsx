import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { api } from '../../../config/api';
import { type IEntrega } from '../../../@types';
import { CountryHandler } from '../../../utils/CountryHandler';
import { DateHandler } from '../../../utils/DateHandler';
import NumberFormat from '../../../utils/NumberFormat';
import { Loader } from '../../../components/Loader';
import { NotFound } from '../../../components/NotFound';
import { AddressInfo } from '../../../components/AddressInfo';

import {
  Container,
  DeliveriesWrapper,
  Btn,
  Header,
  TextWrapper,
  Footer,
  BtnText,
  CommonText,
  CommonInfo,
  AddressWrapper,
} from './styles';

export const DeliveryHistory: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [deliveries, setDeliveries] = useState<IEntrega[]>([]);

  const getDeliveries = useCallback(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await api.get('api/entregas/v1/historico');
        setDeliveries(response.data.data);
      } catch (e) {
        Alert.alert(
          'Oops',
          'Não foi possível carregar o seu histórico de entregas.'
        );
      }
      setIsLoading(false);
    })();
  }, [setIsLoading]);

  useEffect(() => {
    (async () => {
      const listener = navigation.addListener('focus', getDeliveries);
      return listener;
    })();
  }, [navigation]);

  const handleOnPress = useCallback(
    async (
      id: number,
      action: 'aceite' | 'aCaminho' | 'finalize'
    ) => {
      const title =
        action === 'aCaminho'
          ? 'Pronto para entregar'
          : 'Entrega realizada';

      const text =
        action === 'aCaminho'
          ? 'Deseja mesmo alterar o status da entrega para "a caminho"?'
          : 'Marcar a entrega como realizada?';

      Alert.alert(title, text, [
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await api.put(
                `api/entregas/v1/${action}?entregaId=${id}`
              );
              const response = await api.get(
                'api/entregas/v1/historico'
              );
              setDeliveries(response.data.data);
            } catch (e) {
              Alert.alert(
                'Oops!',
                'Não foi possível realizar esta ação.'
              );
            }
          },
        },
        {
          text: 'Cancelar',
        },
      ]);
    },
    []
  );

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <Container>
      {deliveries?.length > 0 ? (
        deliveries.map((item) => {
          const vendedorEndereco = {
            rua: item.enderecoLoja.rua || '',
            bairro: item.enderecoLoja.bairro || '',
            cidade: item.enderecoLoja.cidade || '',
            estado: item.enderecoLoja.estado || '',
            complemento: item.enderecoLoja.complemento || '',
            numero: item.enderecoLoja.numero || '',
            cep: item.enderecoLoja.cep || '',
          };
          const compradorEndereco = {
            rua: item.enderecoEntrega.rua || '',
            bairro: item.enderecoEntrega.bairro || '',
            cidade: item.enderecoEntrega.cidade || '',
            estado: item.enderecoEntrega.estado || '',
            complemento: item.enderecoEntrega.complemento || '',
            numero: item.enderecoEntrega.numero || '',
            cep: item.enderecoEntrega.cep || '',
          };
          return (
            <DeliveriesWrapper key={item.id}>
              <Header>
                <TextWrapper>
                  <CommonText>Disponível desde: </CommonText>
                  <CommonInfo>
                    {DateHandler(item.createdAt, {
                      dateFormat: 'DD/MM',
                      time: true,
                    })}
                  </CommonInfo>
                </TextWrapper>
                <TextWrapper>
                  <CommonText>Você recebe: </CommonText>
                  <CommonInfo>
                    {'R$ ' + item.valorRemuneracao}
                  </CommonInfo>
                </TextWrapper>
              </Header>
              <Header>
                <TextWrapper>
                  <CommonText>Distância: </CommonText>
                  <CommonInfo>{item.distanciaEntrega}</CommonInfo>
                </TextWrapper>
              </Header>
              <AddressWrapper>
                <AddressInfo
                  endereco={vendedorEndereco}
                  name={item.vendedorName}
                  userType="Vendedor"
                />
                <AddressInfo
                  endereco={compradorEndereco}
                  name={item.compradorName}
                  userType="Comprador"
                />
              </AddressWrapper>
              <Footer>
                {item.statusEntrega === 'TOMADA' && (
                  <Btn
                    onPress={async () => {
                      await handleOnPress(item.id, 'aCaminho');
                    }}
                  >
                    <BtnText>Entregar</BtnText>
                  </Btn>
                )}
                {item.statusEntrega === 'A_CAMINHO' && (
                  <Btn
                    onPress={async () => {
                      await handleOnPress(item.id, 'finalize');
                    }}
                  >
                    <BtnText>Finalizar entrega</BtnText>
                  </Btn>
                )}
              </Footer>
            </DeliveriesWrapper>
          );
        })
      ) : (
        <NotFound message="Não há entregas no seu histórico" />
      )}
    </Container>
  );
};
