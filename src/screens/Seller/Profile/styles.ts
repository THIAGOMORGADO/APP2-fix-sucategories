import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  padding: 20px;
  display: flex;
`;

export const Form = styled.View`
  width: 100%;
  padding: 20px 0;
`;

export const Text = styled.Text<{ highLight: boolean }>`
  color: ${({ highLight }) =>
    highLight ? colors.default.green : colors.default.textDark};
  margin-top: ${({ highLight }) => (!highLight ? '8px' : 0)};
  margin-bottom: ${({ highLight }) => (!highLight ? '8px' : 0)};
`;
