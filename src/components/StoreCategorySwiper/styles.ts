import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../constants';

export const ContainerRow = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.TouchableOpacity`
  position: relative;
  background-color: ${COLORS.white};
  width: 180px;
  border-radius: 30px;
  margin: 10px;
  margin-left: 0;
  margin-right: 20px;
`;

export const Picture = styled.Image`
  height: 150px;
  width: 100%;
  background-color: ${COLORS.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const TextContainer = styled.View`
  padding: ${SIZES.padding - 5}px ${SIZES.padding}px;
`;

export const Title = styled.Text`
  font-weight: bold;
  line-height: 15px;
  color: ${COLORS.green};
`;

export const ButtonMoreContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-left: 0;
  margin-right: 40px;
`;
