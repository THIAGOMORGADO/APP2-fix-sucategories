import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  padding: 16px 8px;
  align-items: center;
`;

export const IconWrapper = styled.View`
  background-color: ${colors.categories.greenLight};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;

export const Icon = styled(Feather)`
  color: ${colors.default.green};
  font-size: 22px;
`;

export const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin-top: 8px;
`;
