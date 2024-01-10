import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Category = styled.View`
  padding: 16px 8px;
  background-color: ${colors.default.bgLighter};
`;

export const CategoryWrapper = styled.ScrollView`
  width: 100%;
`;

export const EmptyWrapper = styled.View`
  align-items: center;
`;

export const Empty = styled.Text`
  font-weight: 400;
  font-size: 20px;
  margin-left: 8px;
  color: ${colors.default.textGray};
  width: 75%;
  margin-top: 32px;
  text-align: center;
`;

export const StoresWrapper = styled.View`
  padding: 16px 8px;
`;

export const ListWrapper = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  margin-top: 8px;
`;
