import React from 'react';
import { type ICompra } from '../../@types';
import NumberFormat from '../../utils/NumberFormat';

import {
  CardContainer,
  CardProductName,
  CardCommonText,
  CardTextWrapper,
  CardCommonInfo,
  InfoWrapper,
} from './styles';

interface ISaleCard {
  data: ICompra;
}

export const SaleCardProduct: React.FC<ISaleCard> = ({ data }) => {
  // console.log({data})
  return (
    <CardContainer>
      <CardProductName>{data.productName}</CardProductName>
      <CardCommonText>
        {data.productDescription || '-'}
      </CardCommonText>

      <InfoWrapper>
        <CardTextWrapper>
          <CardCommonText>Quantidade: </CardCommonText>
          <CardCommonInfo>{`${data.qtdComprada}${data.unidadeMedida}`}</CardCommonInfo>
        </CardTextWrapper>

        <CardTextWrapper>
          <CardCommonText>Valor Un: </CardCommonText>
          <CardCommonInfo>
            {NumberFormat.currency(
              data.productPrice,
              undefined,
              data.enderecoLoja.pais
            )}
          </CardCommonInfo>
        </CardTextWrapper>
      </InfoWrapper>
    </CardContainer>
  );
};
