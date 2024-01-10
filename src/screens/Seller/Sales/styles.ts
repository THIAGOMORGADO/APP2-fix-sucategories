import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const ProductsWrapper = styled.ScrollView`
  padding: 8px;
`;

export const ProductsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const ProductsTitle = styled.Text`
  color: ${colors.default.textDark};
  font-weight: 400;
  font-size: 24px;
`;

export const ListWrapper = styled.View`
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
  margin-bottom: 16px;
`;
