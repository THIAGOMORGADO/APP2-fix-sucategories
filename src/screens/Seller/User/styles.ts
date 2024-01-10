import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  padding: 8px 16px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text<{ isFocused: boolean }>`
  color: ${({ isFocused }) =>
    isFocused
      ? colors.tabs.seller.textFocused
      : colors.tabs.seller.textBlur};
`;
