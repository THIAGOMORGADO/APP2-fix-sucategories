import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { colors } from '../../constants/colors';

const width = Dimensions.get('window').width - 80;

export const Container = styled.View`
  padding: 20px;
  background-color: ${colors.default.bgLight};
  margin-top: 20px;
`;

export const Image = styled.Image`
  width: ${`${width}px`};
  height: ${`${width}px`};
`;
