import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  padding: 16px;
  display: flex;
`;

export const TextView = styled.View`
  background-color: ${colors.default.bgLighter};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 5px;
`;

export const Paragraph = styled.Text<{ bold: boolean }>`
  margin-bottom: 8px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
`;
