import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.default.bgLighter};
  position: relative;
`;

export const LogoWrapper = styled.View`
  width: 100%;
  height: 65%;
  padding-top: 20%;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.View`
  width: 100%;
  height: 35%;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  flex: 1;
  width: ${`${width * 0.65}px`};
  height: ${`${(height * 0.65 * 1.304568527918782).toFixed(0)}px`};
  margin-top: 16px;
`;

export const Title400 = styled.Text`
  color: ${colors.default.textDark};
  font-size: 24px;
  text-align: center;
  width: 100%;
  color: ${colors.default.green};
  text-transform: uppercase;
  padding-bottom: 20px;
`;

export const Description = styled.Text`
  color: ${colors.default.textDark};
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  line-height: 20px;
`;

export const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const GoLink = styled.TouchableOpacity`
  margin: 10px 0 20px 0;
`;

export const GoLinkText = styled.Text`
  width: 100%;
  text-align: right;
`;

export const Green = styled.Text`
  color: ${colors.default.green};
  opacity: 0.6;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
