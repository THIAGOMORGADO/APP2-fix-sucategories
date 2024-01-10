import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { SaleCard } from '../../../components/SaleCard';
import {
  type IEndereco,
  type IVenda,
  IVendaStatus,
} from '../../../@types';
import { Title } from '../../../components/Title';
import { api } from '../../../config/api';
import { Loader } from '../../../components/Loader';
import { NotFound } from '../../../components/NotFound';
import { vendasFilter } from '../../../utils/vendasFilter';

import {
  ProductsWrapper,
  ProductsHeader,
  ListWrapper,
} from './styles';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

export const SalesHistory: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [vendas, setVendas] = useState<IVenda[]>([]);
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
  const source = 'sales';

  const getVendas = useCallback(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`api/vendas/v1`);
        const sales: IVenda[] = vendasFilter(response.data.data, [
          'A_CAMINHO',
          'FINALIZADA',
          'CANCELADA',
        ]);

        setVendas(sales);
      } catch (error) {
        setModalState({
          ...modalState,
          title: 'Oops!',
          description: 'Não foi possível carregar os seus pedidos.',
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

  useEffect(() => {
    (async () => {
      const listener = navigation.addListener('focus', getVendas);

      return listener;
    })();
  }, [navigation]);

  return isLoading ? (
    <Loader />
  ) : (
    <ProductsWrapper scrollEnabled>
      <ProductsHeader>
        <Title fontSize="20px">Minhas Vendas</Title>
      </ProductsHeader>
      <ListWrapper>
        {vendas?.length > 0 ? (
          vendas.reverse().map((venda) => {
            const endereco: IEndereco = {
              rua: venda.compras[0].enderecoEntrega.rua,
              bairro: venda.compras[0].enderecoEntrega.bairro,
              cidade: venda.compras[0].enderecoEntrega.cidade,
              estado: venda.compras[0].enderecoEntrega.estado,
              complemento:
                venda.compras[0].enderecoEntrega.complemento,
              numero: venda.compras[0].enderecoEntrega.numero,
              cep: venda.compras[0].enderecoEntrega.cep,
              pais: undefined,
            };
            return (
              <SaleCard
                key={venda.id}
                {...{
                  venda,
                  setIsLoading,
                  setVendas,
                  source,
                  endereco,
                }}
              />
            );
          })
        ) : (
          <NotFound message="Nenhuma venda para exibir" />
        )}
      </ListWrapper>

      <MessageModal
        description={modalState.description}
        handleContinue={modalState.handleContinue}
        handleCancel={modalState.handleCancel}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </ProductsWrapper>
  );
};
