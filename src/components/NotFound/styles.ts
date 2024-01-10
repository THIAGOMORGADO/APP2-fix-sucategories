import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  margin-top: 0;
  flex: 1;
  height: ${(windowHeight - 130).toFixed(2)}px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Text = styled.Text`
  color: ${colors.default.textGray};
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  padding: 16px;
  width: 100%;
  border-radius: 5px;
`;
