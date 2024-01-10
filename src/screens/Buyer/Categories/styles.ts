import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Category = styled.View`
  padding: 16px 8px;
  background-color: ${colors.default.bgLighter};
`;

export const CategoryWrapper = styled.ScrollView`
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: 400;
  font-size: 16px;
  margin-left: 8px;
`;

export const StoresWrapper = styled.View``;

export const ListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
`;

export const ButtonMoreContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 70px;
  margin-left: 0;
  margin-right: 40px;
`;