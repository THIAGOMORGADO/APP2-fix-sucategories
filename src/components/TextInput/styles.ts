import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  flex-direction: row;
`;

export const Input = styled(TextInput)`
  margin: -4px 0;
`;

export const BtnWrapper = styled.View`
  padding: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid ${colors.default.gray};
  height: 60px;
  margin-left: 2px;
  margin-top: 1px;
`;

export const BtnTxt = styled.Text`
  font-size: 16px;
  color: ${colors.default.textDark};
`;
