import styled from 'styled-components/native';
import { colors } from '../../constants/colors';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: ${colors.default.green};
  border-radius: ${SIZES.radius}px;
  align-items: center;
  border: 1px solid ${colors.default.green};
`;

export const Picture = styled.Image`
  height: 100%;
  min-height: 60px;
  width: 60px;
  background-color: ${COLORS.white};
  border-top-left-radius: ${SIZES.radius}px;
  border-bottom-left-radius: ${SIZES.radius}px;
`;

export const TitleContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: ${FONTS.h3.fontSize}px;
  font-weight: 600;
  color: ${COLORS.white};
`;
