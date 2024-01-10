import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  padding: 4px 16px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${colors.default.textGray};
  text-align: center;
  margin-top: 16px;
`;

export const Form = styled.View`
  padding: 16px 16px 0 16px;
  margin: 16px 0;
  background-color: ${colors.default.bgLighter};
  elevation: 2;
`;

export const FieldWrapper = styled.View`
  margin: 16px 0 -12px 0;
`;

export const BtnWrapper = styled.View`
  margin-bottom: 8px;
  align-items: flex-end;
`;
