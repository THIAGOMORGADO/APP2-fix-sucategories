import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fdfdfd;
  position: relative;
`;

export const LogoWraper = styled.View`
  width: 100%;
  height: 55%;
  align-items: center;
  justify-content: center;
  /* background-color: #Dbb */
`;

export const TextWraper = styled.View`
  width: 100%;
  height: 45%;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  flex: 1;
  width: 65%;
`;
export const Title = styled.Text`
  color: #333;
  font-size: 24px;
  text-align: center;
  width: 100%;
  font-family: 'Roboto_700Bold';
`;

export const Description = styled.Text`
  color: #333;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  font-family: 'Roboto_400Regular';
  line-height: 20px;
`;

export const ButtonWraper = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;
