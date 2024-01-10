import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../../../constants/colors';

const { height } = Dimensions.get('screen');

export const Category = styled.View`
  padding: 16px 8px;
  background-color: ${colors.default.bgLighter};
`;

export const CategoryWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: 400;
  font-size: 16px;
  margin-left: 8px;
`;

export const ProductsWrapper = styled.View`
  padding: 10px 8px;
`;

export const ListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
`;
