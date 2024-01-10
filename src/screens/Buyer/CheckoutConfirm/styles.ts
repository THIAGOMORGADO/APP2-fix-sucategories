import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  width: 100%;
`;

export const ReviewContainer = styled.View`
  background-color: ${colors.default.bgLighter};
  padding: 8px;
  border-radius: 5px;
  margin-top: 16px;
`;

export const TotalWrapper = styled.View`
  background-color: ${colors.default.bgLighter};
  margin: 8px 0;
  padding: 16px;
  border-radius: 4px;
  elevation: 2;
  justify-content: center;
`;

export const CartWrapper = styled.View`
  flex-direction: row;
  margin: 8px;
`;

export const Img = styled.Image<{ imgWidth: number }>`
  width: 60px;
  height: ${({ imgWidth }) => `${imgWidth}px`};
`;

export const LineWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const FreteTotal = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;
export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4e455e;
`;
