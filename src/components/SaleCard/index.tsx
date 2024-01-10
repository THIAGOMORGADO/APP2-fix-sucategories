/* eslint-disable max-len */
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import { SaleCardProduct } from '../SaleCardProduct';
import NumberFormat from '../../utils/NumberFormat';
import {
  type IEndereco,
  type IVenda,
  type IVendaStatus,
} from '../../@types';
import { useAuth } from '../../hooks/auth';
import { AddressInfo } from '../AddressInfo';
import { handleOrderNumber } from '../../utils/handleOrderNumber';
import { vendasFilter } from '../../utils/vendasFilter';
import { api } from '../../config/api';
import { colors } from '../../constants/colors';
import { DateHandler } from '../../utils/DateHandler';

import {
  Wrapper,
  CardCommonText,
  CardTextWrapper,
  CardCommonInfo,
  Btn,
  BtnTxt,
  BtnWrapper,
  Info,
  Status,
  InfoColumn,
  Divider,
} from './styles';
import { errorHandler } from '../../utils/errorInstance';

interface ISaleCard {
  venda: IVenda;
  setVendas: React.Dispatch<React.SetStateAction<IVenda[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  source: 'sales' | 'salesHistory';
  endereco: IEndereco;
}

export const SaleCard: React.FC<ISaleCard> = ({
  venda,
  setVendas,
  setIsLoading,
  source,
  endereco,
}) => {
  const { user } = useAuth();

  const handleBtnPress = useCallback(
    async (
      sale: IVenda,
      action: 'confirm' | 'cancel' | 'ready' | 'pedidoEntregue'
    ) => {
      const title =
        action === 'confirm'
          ? 'Confirmar venda'
          : action === 'ready'
            ? 'Pronto para despachar'
            : action === 'pedidoEntregue'
              ? 'Confirmar como entregue,'
              : 'Cancelar venda';

      const text =
        action === 'confirm'
          ? 'confirmar venda'
          : action === 'ready'
            ? 'despachar venda'
            : action === 'pedidoEntregue'
              ? 'confirmar como entregue'
              : 'cancelar venda';

      const glue = action === 'pedidoEntregue' ? '/' : '?id=';

      Alert.alert(title, `Deseja realmente ${text} esta venda?`, [
        {
          text: `Sim, ${text}`,
          onPress: async () => {
            setIsLoading(true);

            try {
              await api.put(
                `api/vendas/v1/${action}${glue}${sale.id}`
              );

              const response = await api.get(`api/vendas/v1`);
              const salesStatus: IVendaStatus[] = [
                'NOVA',
                'EM_PREPARACAO',
                'AGUARDANDO_ENTREGADOR',
              ];
              const salesHistoryStatus: IVendaStatus[] = [
                'NOVA',
                'EM_PREPARACAO',
                'AGUARDANDO_ENTREGADOR',
              ];
              const vendas: IVenda[] = vendasFilter(
                response.data.data,
                source === 'sales' ? salesStatus : salesHistoryStatus
              );

              setVendas(vendas);
            } catch (e: any) {
              errorHandler(e, false, (message) => {
                Alert.alert(
                  'Oops!',
                  (message as string) ||
                    'Não foi possível realizar esta ação.'
                );
              });
            } finally {
              setIsLoading(false);
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

  useEffect(() => {
    const presentationVenda = venda;
    presentationVenda.compras = [];
  }, []);

  return (
    <Wrapper key={venda.id} status={venda.status}>
      <Info>
        <CardTextWrapper>
          <CardCommonText>Pedido: </CardCommonText>
          <CardCommonInfo>{handleOrderNumber(venda)}</CardCommonInfo>
        </CardTextWrapper>
      </Info>
      <Info>
        <CardTextWrapper>
          <CardCommonText>Pedido em: </CardCommonText>
          <CardCommonInfo>
            {DateHandler(
              venda.compras[0]?.createdAt as unknown as Date,
              {
                dateFormat: 'DD/MM/YY',
              }
            )}
          </CardCommonInfo>
        </CardTextWrapper>

        <Status status={venda.status}>
          {handleStatus(venda.status)}
        </Status>
      </Info>
      {venda.compras.map((item) => (
        <SaleCardProduct key={item.id} data={item} />
      ))}
      <Divider />
      <Info>
        <InfoColumn>
          <AddressInfo
            endereco={endereco}
            name={venda.compradorName}
            userType="Comprador"
          />
        </InfoColumn>
        <InfoColumn>
          <CardTextWrapper>
            <CardCommonText>Taxa de Entrega: </CardCommonText>
            <CardCommonInfo>
              {'taxaFieldrightEntrega' in venda
                ? venda.taxaFieldrightEntrega
                : null}
            </CardCommonInfo>
          </CardTextWrapper>

          <CardTextWrapper>
            <CardCommonText>Taxa de Venda: </CardCommonText>
            <CardCommonInfo>
              {'taxaFieldrightVenda' in venda
                ? venda.taxaFieldrightVenda
                : null}
            </CardCommonInfo>
          </CardTextWrapper>

          <CardTextWrapper>
            <CardCommonText>Valor Líquido: </CardCommonText>
            <CardCommonInfo>
              {'valorLiquido' in venda ? venda.valorLiquido : null}
            </CardCommonInfo>
          </CardTextWrapper>

          <CardTextWrapper>
            <CardCommonText>Comissão: </CardCommonText>
            <CardCommonInfo>
              {'enderecoLoja' in venda.compras[0] &&
              venda.compras.length > 0
                ? NumberFormat.currency(
                    venda.vlTotal - venda.valorRemuneracao,
                    undefined,
                    venda.compras[0].enderecoLoja.pais
                  )
                : null}
            </CardCommonInfo>
          </CardTextWrapper>

          <CardTextWrapper>
            <CardCommonText>Meio de Pagamento: </CardCommonText>
            <CardCommonInfo>
              {'formaPagamento' in venda
                ? venda.formaPagamento
                : null}
            </CardCommonInfo>
          </CardTextWrapper>

          <CardTextWrapper>
            <CardCommonText>Valor Total: </CardCommonText>
            <CardCommonInfo>
              {'vlTotal' in venda
                ? NumberFormat.currency(
                    venda.vlTotal,
                    undefined,
                    venda.compras[0].enderecoLoja.pais
                  )
                : null}
            </CardCommonInfo>
          </CardTextWrapper>
        </InfoColumn>
      </Info>

      <BtnWrapper>
        {(() => {
          if (venda.status === 'NOVA')
            return (
              <>
                <Btn
                  btnColor={colors.default.green}
                  onPress={async () => {
                    await handleBtnPress(venda, 'confirm');
                  }}
                >
                  <BtnTxt color={colors.default.green}>
                    Confirmar Venda
                  </BtnTxt>
                </Btn>
                <Btn
                  btnColor={colors.default.red}
                  onPress={async () => {
                    await handleBtnPress(venda, 'cancel');
                  }}
                >
                  <BtnTxt color={colors.default.red}>
                    Cancelar Venda
                  </BtnTxt>
                </Btn>
              </>
            );
          if (venda.status === 'EM_PREPARACAO')
            return (
              venda.status === 'EM_PREPARACAO' && (
                <Btn
                  btnColor={colors.default.green}
                  onPress={async () => {
                    await handleBtnPress(venda, 'ready');
                  }}
                >
                  <BtnTxt color={colors.default.green}>
                    Despachar Venda
                  </BtnTxt>
                </Btn>
              )
            );
          if (venda.status === 'AGUARDANDO_ENTREGADOR')
            return (
              <Btn
                btnColor={colors.default.green}
                onPress={async () => {
                  await handleBtnPress(venda, 'pedidoEntregue');
                }}
              >
                <BtnTxt color={colors.default.green}>
                  Marcar como Entregue
                </BtnTxt>
              </Btn>
            );
          return null;
        })()}
      </BtnWrapper>
    </Wrapper>
  );
};

type IStatus = {
  [key in IVendaStatus]: string;
};

const handleStatus = (status: IVendaStatus) => {
  const statusObj: IStatus = {
    NOVA: 'Nova Venda',
    EM_PREPARACAO: 'Em Preparação',
    AGUARDANDO_ENTREGADOR: 'Aguardando Entregador',
    A_CAMINHO: 'A Caminho',
    FINALIZADA: 'Finalizada',
    CANCELADA: 'Cancelada',
  };
  return statusObj[status];
};
