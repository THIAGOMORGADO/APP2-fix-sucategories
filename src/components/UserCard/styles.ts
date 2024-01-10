import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface IBackground {
  background?: string;
}

interface IIconPros {
  color?: string;
}

export const Container = styled.TouchableOpacity<IBackground>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  background-color: ${colors.default.green};
`;

export const Title = styled.Text`
  font-weight: 700;
  color: ${colors.default.textLight};
  font-size: 24px;
`;

export const Description = styled.Text`
  color: ${colors.default.textLight};
  font-size: 16px;
`;

export const TextWrap = styled.View`
  display: flex;
  flex-shrink: 1;
`;

export const IconWrap = styled.View`
  margin-right: 20px;
  padding: 10px;
`;

export const Icon = styled(FontAwesome5)<IIconPros>`
  color: ${(props) => props.color || colors.default.textLight};
`;
