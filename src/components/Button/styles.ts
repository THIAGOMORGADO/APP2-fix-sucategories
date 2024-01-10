import styled, { css } from 'styled-components/native';
import { Button } from 'react-native-paper';
import { colors } from '../../constants/colors';

interface IButton {
  marginLeft?: boolean;
  width?: number | undefined;
  backgroundColor?: string;
}

interface IButtonText {
  upper?: boolean;
  textColor?: string;
}

export const Btn = styled(Button)<IButton>`
  margin: 8px 0;
  width: ${({ width }) => (width ? `${width}%` : '100%')};
  padding: 4px;
  border-radius: 4px;
  margin-left: ${({ marginLeft, width }) =>
    marginLeft && width ? `${100 - width}%` : 0};
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `};
  ${({ backgroundColor }) =>
    backgroundColor === 'transparent' &&
    css`
      box-shadow: none;
    `};
  elevation: 2;
`;

export const ButtonText = styled.Text<IButtonText>`
  color: ${({ textColor }) => textColor || colors.default.textLight};
  font-size: 16px;
  text-transform: ${({ upper }) => (upper ? 'uppercase' : 'none')};
`;
export const IsMoreContainer = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ButtonMoreText = styled(ButtonText)`
  font-size: 14px;
`;
