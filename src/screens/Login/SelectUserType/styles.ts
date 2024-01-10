import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.default.bgLighter};
  position: relative;
  padding: 0 20px;
  margin-top: -20px;
`;

export const Title = styled.Text`
  color: ${colors.default.textDark};
  font-size: 36px;
  text-align: center;
  width: 100%;
  font-family: 700;
  color: ${colors};
  text-transform: uppercase;
`;

export const Title400 = styled.Text`
  color: ${colors.default.textDark};
  font-size: 24px;
  text-align: center;
  width: 100%;
  color: ${colors.default.green};
  text-transform: uppercase;
`;
