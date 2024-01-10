import styled from 'styled-components/native';
import { Paragraph } from 'react-native-paper';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: -8px;
  margin-bottom: -8px;
`;

export const P = styled(Paragraph)`
  max-width: 90%;
`;
