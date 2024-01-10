import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.ScrollView`
  padding: 8px;
`;

export const DeliveriesWrapper = styled.View`
  margin: 8px;
  padding: 8px;
  background-color: ${colors.default.bgLighter};
  border-radius: 4px;
  elevation: 2;
`;

export const Btn = styled.TouchableOpacity<{ color?: string }>`
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ color }) => color || colors.default.green};
  width: 150px;
  justify-content: center;
  align-items: center;
  margin: 6px;
`;

export const BtnText = styled.Text<{ color?: string }>`
  color: ${({ color }) => color || colors.default.green};
  font-size: 14px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const TextWrapper = styled.View`
  margin: 8px;
  flex-direction: row;
`;

export const CommonText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const CommonInfo = styled.Text`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.default.textDark};
`;
