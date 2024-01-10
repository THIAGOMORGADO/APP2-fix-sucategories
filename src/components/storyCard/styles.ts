import styled from 'styled-components/native';
import { colors } from '../../constants/colors';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${width / 2.3}px;
  min-width: 170px;
  background-color: ${COLORS.white};
  border-radius: ${SIZES.radius}px;
  overflow: hidden;
`;

export const PictureContainer = styled.View`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PictureContent = styled.View`
  height: 100px;
  width: 100px;
`;

export const Picture = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 50px;
  border-width: 1px;
  border-color: #f5f5f5;
`;

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 10px;
  background-color: ${colors.default.green};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: ${FONTS.h3.fontSize}px;
  font-weight: 600;
  color: ${COLORS.white};
`;

export const IconContainer = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white};
  padding: 4px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 50px;
`;

export const Icon = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`;
