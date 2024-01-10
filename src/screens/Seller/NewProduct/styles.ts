import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  padding: 16px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 16px;
  color: ${colors.default.textGray};
  text-transform: uppercase;
`;

export const Text = styled.Text``;

export const Form = styled.View`
  width: 100%;
`;

export const OpenCamera = styled.TouchableOpacity`
  padding: 8px 16px;
`;
