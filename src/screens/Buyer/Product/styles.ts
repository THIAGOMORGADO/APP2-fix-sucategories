import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.default.bgLighter};
`;

export const Content = styled.View`
  background-color: ${colors.default.bgLighter};
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-bottom: 80px;
`;

export const ImgContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

export const Img = styled.Image<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

export const WeightWrapper = styled.View`
  background-color: ${colors.default.bgGray};
  border-radius: 4px;
  width: 150px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const Weight = styled.Text`
  font-size: 14px;
  color: ${colors.default.textDark};
`;

export const Name = styled.Text`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  margin: 32px 0 8px 0;
  color: ${colors.default.textDark};
  width: 100%;
  text-align: left;
`;

export const Price = styled.Text`
  color: ${colors.default.textGray};
  font-size: 16px;
  margin-bottom: 16px;
  width: 100%;
  text-align: left;
`;

export const Description = styled.Text`
  color: ${colors.default.textGray};
  font-size: 16px;
  margin-bottom: 16px;
  width: 100%;
  text-align: left;
`;

export const FreteWrapper = styled.View`
  width: 100%;
`;

export const FreteTxt = styled.Text`
  font-size: 16px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  border: 1px solid ${colors.default.border};
  width: 100%;
  background-color: ${colors.default.bgLight};
  padding: 16px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
export const QtdWrapper = styled.View`
  flex-direction: row;
  border: 1px solid ${colors.default.border};
  align-items: center;
  justify-content: space-evenly;
  width: 30%;
`;

export const QtdBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FontAwesome)<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 18px;
`;

export const QtdNumWrapper = styled.View`
  padding: 16px 8px;
`;

export const QtdNum = styled.Text`
  font-size: 16px;
  color: ${colors.default.textGray};
`;

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const StyledButtonTxt = styled.Text`
  color: ${colors.default.green};
  text-transform: uppercase;
  font-size: 16px;
`;
