// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../../../config/api';
import { type IEntrega } from '../../../@types';
import { CountryHandler } from '../../../utils/CountryHandler';
import { DateHandler } from '../../../utils/DateHandler';
import NumberFormat from '../../../utils/NumberFormat';
import { Loader } from '../../../components/Loader';

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
} from './styles';
import { useAuth } from '../../../hooks/auth';
import { NotFound } from '../../../components/NotFound';
import { colors } from '../../../constants/colors';

const handleAccept = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDeliveries: React.Dispatch<React.SetStateAction<IEntrega[]>>,
  id: number
): void => {
  Alert.alert('Aceitar a entrega', 'Deseja realizar esta entrega?', [
    {
      text: 'Aceitar',
      onPress: async () => {
        setIsLoading(true);

        try {
          await api.put(`api/entregas/v1/aceite?entregaId=${id}`);
          const response = await api.get(
            'api/entregas/v1/findAllDisponivel'
          );
          setDeliveries(response.data.data);
          setIsLoading(false);
        } catch (e) {
          Alert.alert(
            'Oops!',
            'Não foi possível realizar esta ação.'
          );
        }
        setIsLoading(false);
      },
    },
    {
      text: 'Cancelar',
    },
  ]);
};
const handleReject = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDeliveries: React.Dispatch<React.SetStateAction<IEntrega[]>>,
  id: number
): void => {
  Alert.alert(
    'Rejeitar entrega',
    'Deseja relamente rejeitar esta entrega? Ela não ficará mais disponível para você.',
    [
      {
        text: 'Aceitar',
        onPress: async () => {
          setIsLoading(true);

          try {
            await api.put(`api/entregas/v1/recuse?entregaId=${id}`);
            const response = await api.get(
              'api/entregas/v1/findAllDisponivel'
            );
            setDeliveries(response.data.data);
          } catch (e) {
            Alert.alert(
              'Oops!',
              'Não foi possível realizar esta ação.'
            );
          }
          setIsLoading(false);
        },
      },
      {
        text: 'Cancelar',
      },
    ]
  );
};

export const Delivery: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deliveries, setDeliveries] = useState<IEntrega[]>([]);
  const { user } = useAuth();

  const getDeliveries = useCallback(() => {
    (async () => {
      try {
        const response = await api.get(
          'api/entregas/v1/findAllDisponivel'
        );
        setDeliveries(response.data.data.content);
      } catch (error) {
        Alert.alert(
          'Oops',
          'Não foi possível carregar entregas disponíveis.'
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
    getDeliveries();
  }, [navigation]);

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <Container>
      {deliveries?.length > 0 ? (
        deliveries.map((item) => (
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
                  {NumberFormat.currency(
                    item.valoresRemuneracao[user?.tipoVeiculo],
                    undefined,
                    CountryHandler.NameToISO(
                      item.enderecoEntrega.pais
                    )
                  )}
                </CommonInfo>
              </TextWrapper>
            </Header>
            <Header>
              <TextWrapper>
                <CommonText>Distância: </CommonText>
                <CommonInfo>{item.distanciaEntrega}</CommonInfo>
              </TextWrapper>
            </Header>
            <Footer>
              {item.statusEntrega === 'NOVA' && (
                <Btn
                  onPress={() => {
                    handleAccept(
                      setIsLoading,
                      setDeliveries,
                      item.id
                    );
                  }}
                >
                  <BtnText>Aceitar Entrega</BtnText>
                </Btn>
              )}
              {item.statusEntrega === 'NOVA' && (
                <Btn
                  color={colors.default.red}
                  onPress={() => {
                    handleReject(
                      setIsLoading,
                      setDeliveries,
                      item.id
                    );
                  }}
                >
                  <BtnText color={colors.default.red}>
                    Rejeitar Entrega
                  </BtnText>
                </Btn>
              )}
            </Footer>
          </DeliveriesWrapper>
        ))
      ) : (
        <NotFound message="Nenhuma entrega para a sua região no momento" />
      )}
    </Container>
  );
};
