import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const ProductsWrapper = styled.View`
  align-self: center;
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

export const ProductsNewBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.default.bgLighter};
  padding: 4px 8px;
  border-radius: 4px;
`;

export const Icon = styled(Entypo)`
  color: ${colors.default.green};
  font-size: 24px;
`;

export const ProductsNewBtnText = styled.Text`
  color: ${colors.default.green};
  font-weight: 400;
  font-size: 16px;
  margin-left: 8px;
  margin-right: 4px;
  padding: 8px 0;
`;

export const ListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
  margin-bottom: 16px;
`;
