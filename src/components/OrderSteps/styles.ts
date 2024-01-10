import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

const winWidth = Dimensions.get('window').width;

export const StepWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface IHandleColor {
  isActive: boolean;
  isCanceled: boolean;
  type?: 'line' | 'icon' | 'circle';
}

const handleColor = ({
  isActive,
  isCanceled,
  type,
}: IHandleColor) => {
  return !isCanceled
    ? isActive
      ? colors.default.green
      : colors.default.gray
    : type === 'icon'
      ? colors.default.gray
      : colors.default.red;
};

export const Circle = styled.View<IHandleColor>`
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 2px solid
    ${(args) => handleColor({ ...args, type: 'circle' })};
  border-radius: 20px;
`;

export const Icon = styled(FontAwesome5)<IHandleColor>`
  color: ${(args) => handleColor({ ...args, type: 'icon' })};
  font-size: 16px;
`;

export const Line = styled.View<IHandleColor>`
  height: 2px;
  width: ${`${(winWidth - 64 - 35 * 5) / 8}px`};
  background-color: ${(args) =>
    handleColor({ ...args, type: 'line' })};
`;
