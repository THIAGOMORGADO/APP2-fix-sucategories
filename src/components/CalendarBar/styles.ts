import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  padding: 5px;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const DateContainer = styled.View<{ highLight?: boolean }>`
  margin: 8px;
  background-color: ${({ highLight }) =>
    highLight ? colors.default.green : colors.default.bgLight};

  padding: 8px 12px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const DayTxt = styled.Text<{ highLight: boolean }>`
  color: ${({ highLight }) =>
    highLight ? colors.default.textLight : colors.default.textDark};
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  font-size: 24px;
  color: ${colors.default.green};
`;
