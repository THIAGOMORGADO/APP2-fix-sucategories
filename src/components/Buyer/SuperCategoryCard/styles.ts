import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../../constants/colors';
import { Feather, FontAwesome } from '@expo/vector-icons';

const winWidth = Dimensions.get('screen').width;

export const Container = styled.TouchableOpacity`
  background-color: ${colors.default.bgLighter};
  width: ${`${Math.floor(Dimensions.get('window').width - 32)}px`};
  height: 120px;
  /* padding: 16px; */
  border-radius: 4px;
  align-items: center;
  margin: 8px 8px;
`;

export const Title = styled.Text`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-align: left;
  width: 100%;
  padding: 2px 8px;
`;

export const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TextWrapper = styled.View`
  justify-content: flex-end;
  width: 60%;
`;

export const Icon = styled(FontAwesome)<{ favorite: boolean }>`
  font-size: 24px;
  color: ${({ favorite }) =>
    favorite ? colors.default.green : colors.default.gray};
`;

export const Img = styled.Image<{ height: number }>`
  width: 120px;
  height: ${({ height }) => (height > 120 ? '120px' : `${height}px`)};
  margin: 0px 0;
  /* border-radius: 4px; */
  position: relative;
`;
