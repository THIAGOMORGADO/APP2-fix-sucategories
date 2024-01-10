import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';
import { Title as ComponentTitle } from '../../../components/Title';

export const Container = styled.ScrollView`
  padding: 8px 16px;
`;

export const Title = styled(ComponentTitle)`
  font-size: 20px;
  margin: 8px;
`;

export const Img = styled.Image<{ imgWidth: number }>`
  width: 100px;
  height: ${({ imgWidth }) => `${imgWidth}px`};
`;

export const CartWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.default.bgLighter};
  margin: 8px 0;
  padding: 16px;
  border-radius: 4px;
  elevation: 2;
`;

export const TotalHeader = styled.View`
  flex-direction: row;
`;

export const CartInfoWrapper = styled.View<{ winWidth: number }>`
  padding-left: 16px;
  position: relative;
  width: ${({ winWidth }) => `${winWidth - 164}px`};
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Devider = styled.View`
  height: 1px;
  background-color: #f0f0f0;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: 700;
  width: 75%;
`;

export const Icon = styled(FontAwesome)`
  font-size: 24px;
  color: ${colors.default.red};
`;

export const BtnTrash = styled.TouchableOpacity``;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Quantity = styled.Text``;

export const ItemTotal = styled.Text``;

export const TotalWrapper = styled.View`
  background-color: ${colors.default.bgLighter};
  margin: 8px 0;
  padding: 16px;
  border-radius: 4px;
  elevation: 2;
  justify-content: space-between;
`;

export const Row = styled.View`
  flex-direction: row;
  margin: 8px 0;
  justify-content: space-between;
`;

export const OrderDateWrapper = styled.View`
  align-items: center;
`;

export const OrderDate = styled.Text`
  font-size: 16px;
`;

export const PriceTotal = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0;
  text-align: right;
  width: 100%;
`;

export const EmptyCartContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyCartText = styled.Text`
  font-size: 16px;
  margin: 32px 16px;
`;

export const EmptyCartImg = styled.Image`
  width: 200px;
  height: 200px;
`;
