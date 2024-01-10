import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface ILogo {
  height: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: #fdfdfd;
`;

export const LogoWraper = styled.View<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
`;

export const TextWraper = styled.View<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Logo = styled.Image<ILogo>`
  height: ${({ height }) => `${width * height}px`};
  width: ${`${width}px`};
  /* width: 100%; */
`;

export const Title = styled.Text`
  color: ${colors.default.green};
  font-size: 30px;
  text-align: center;
  width: 100%;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Description = styled.Text`
  color: ${colors.default.textDark};
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  line-height: 24px;
`;

export const ButtonWraper = styled.View`
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;
