import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

const { width } = Dimensions.get('screen');

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

export const SaleBtn = styled.TouchableOpacity<{ btnColor: string }>`
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ btnColor }) => btnColor};
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const BtnTxt = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
`;

export const SaleBtnText = styled.Text`
  color: ${colors.default.green};
  font-size: 14px;
`;

export const SaleBtnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
