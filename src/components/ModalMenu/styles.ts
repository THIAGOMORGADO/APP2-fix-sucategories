import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const TxtLabel = styled.Text`
  color: #333;
`;
export const ModalContainer = styled.View`
  flex: 1;
  margin: 12px;
  margin-top: 54px;
`;

export const MenuItemWrapper = styled.TouchableOpacity`
  padding: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const IconWrapper = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.default.greenLight};
  border-radius: 25px;
`;

export const MenuTxt = styled.Text`
  color: ${colors.default.textDark};
  font-size: 18px;
  margin-left: 16px;
  font-weight: 700;
`;

export const Icon = styled(Feather)<{ margin?: boolean }>`
  color: ${({ color }) =>
    (color as string) || colors.default.textLight};
  font-size: ${({ size }) => (size ? `${size}px` : '24px')};
  ${({ margin }) =>
    margin &&
    css`
      margin-right: 20px;
    `};
`;

export const BtnClose = styled.TouchableOpacity`
  padding: 8px;
`;
