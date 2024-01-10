import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${colors.default.bgLight};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CityName = styled.Text`
  font-size: 20px;
  color: ${colors.default.blue};
`;

export const CityWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 66%;
`;

export const FontAwesome5Styled = styled(FontAwesome5)<{
  color?: string;
}>`
  font-size: 18px;
  text-align: center;
`;

export const IconWrapper = styled.View<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  width: 36px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const IconInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 33%;
`;

export const InfoWrapper = styled.View`
  padding-left: 8px;
`;

export const InfoName = styled.Text`
  font-size: 15px;
`;

export const InfoValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
