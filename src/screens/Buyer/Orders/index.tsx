import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  type ICompraStatus,
  type IUserCompra,
} from '../../../@types';
import { colors } from '../../../constants/colors';
import { api } from '../../../config/api';

import {
  Container,
  OrdersWrapper,
  OrderWrapper,
  StatusText,
  TotalPrice,
  DateText,
  CommonText,
  Btn,
  BtnTxt,
  InfoWrapper,
  Devider,
  Footer,
  Header,
} from './styles';
import { OrderSteps } from '../../../components/OrderSteps';
import { Loader } from '../../../components/Loader';
import { NotFound } from '../../../components/NotFound';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

export const translateStatus = (statusName: ICompraStatus) => {
  const allStatus = {
    AGUARDANDO_PAGAMENTO: 'Aguardando\nPagamento',
    AGUARDANDO_CONFIRMACAO: 'Aguardando\nConfirmação',
    CANCELADA: 'Cancelada',
    EM_PREPARACAO: 'Preparando\nseu pedido',
    A_CAMINHO: 'A Caminho',
    ENTREGUE: 'Entregue',
  };

  return statusName in allStatus ? allStatus[statusName] : statusName;
};

export const Orders: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [compras, setCompras] = useState<IUserCompra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
    messageType: MessageTypes;
    handleContinue: () => void;
    handleCancel: () => void;
  }>({
    title: '',
    description: '',
    messageType: MessageTypes.INFORMATION,
    isVisible: false,
    handleContinue: () => {},
    handleCancel: () => {},
  });

  const getCompras = useCallback(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`api/compras/v1`);
        const vendas: IUserCompra[] = response.data.data;
        setCompras(vendas);
      } catch (error) {
        console.log(error);
        setModalState({
          ...modalState,
          title: 'Oops!',
          description: 'Não foi possível carregar as suas comrpas.',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      }
      setIsLoading(false);
    })();
  }, []);

  const setEntregue = useCallback(async (compra: number) => {
    Alert.alert(
      'Confirmação de Entrega',
      `Deseja marcar esta compra como entregue?`,
      [
        {
          text: `Sim, está entregue`,
          onPress: async () => {
            setIsLoading(true);
            try {
              await api.put(`api/compras/v1/${compra}`, {
                status: 'ENTREGUE',
              });
              Alert.alert(
                'Compra definida como entregue. Muito obrigado!'
              );
            } catch (e: any) {
              const errors = e.response.data.hasOwnProperty('errors')
                ? e.response.data.errors
                : e.response.data.message;
              const message =
                typeof errors === 'string'
                  ? errors
                  : errors.join('. ');

              Alert.alert(
                'Oops!',
                message || 'Não foi possível realizar esta ação.'
              );
            }
            setIsLoading(false);
          },
        },
      ]
    );
  }, []);

  useEffect(() => {
    (async () => {
      const listener = navigation.addListener('focus', getCompras);

      return listener;
    })();
  }, []);

  const handleDate = useCallback((date: Date) => {
    const fullDate = new Date(date);

    const day =
      fullDate.getDate() < 10
        ? `0${fullDate.getDate()}`
        : fullDate.getDate();
    const monthNumber = fullDate.getMonth() + 1;
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;

    return `${day}/${month}/${fullDate.getFullYear()}`;
  }, []);

  useEffect(() => {
    getCompras();

    return () => {
      console.log('unmounted Orders');
    };
  }, []);

  return (
    <Container>
      <OrdersWrapper>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : compras.length > 0 ? (
          compras.reverse().map((item) => {
            return (
              <OrderWrapper
                key={item.id}
                onPress={() =>
                  navigation.navigate('OrderDetails', { order: item })
                }
              >
                <Header>
                  <InfoWrapper>
                    <CommonText>Pedido recebido em: </CommonText>
                    {!(item.compras.length === 0) && (
                      <DateText>
                        {handleDate(item.compras[0].createdAt)}
                      </DateText>
                    )}
                  </InfoWrapper>

                  <InfoWrapper>
                    <CommonText>Quantidade:</CommonText>
                    <TotalPrice>{item.compras.length}</TotalPrice>
                  </InfoWrapper>

                  <InfoWrapper>
                    <CommonText>Status:</CommonText>
                    <StatusText statusName={item.statusCompra}>
                      {translateStatus(item.statusCompra)}
                    </StatusText>
                  </InfoWrapper>
                  {/* item.statusCompra != 'ENTREGUE' ? (
                    <Btn btnColor={colors.default.red} onPress={() => setEntregue(item.id)}>
                      <BtnTxt color={colors.default.red}>Está entregue</BtnTxt>
                    </Btn>
                  ) : null */}
                </Header>
                <Devider />
                <Footer>
                  <OrderSteps
                    status={item.statusCompra}
                    icon={[
                      'money-bill-alt',
                      'clipboard-check',
                      'box',
                      'truck',
                      'check',
                    ]}
                  />
                </Footer>
              </OrderWrapper>
            );
          })
        ) : (
          <NotFound message="Parece que não há nada no seu histórico" />
        )}
      </OrdersWrapper>

      <MessageModal
        description={modalState.description}
        handleContinue={modalState.handleContinue}
        handleCancel={modalState.handleCancel}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </Container>
  );
};
