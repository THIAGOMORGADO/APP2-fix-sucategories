import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { colors } from '../../../constants/colors';

export const Container = styled.TouchableOpacity`
  background-color: ${colors.default.bgLighter};
  width: ${`${
    Math.floor(Dimensions.get('window').width - 48) / 2
  }px`};
  height: 220px;
  /* padding: 16px; */
  border-radius: 4px;
  align-items: center;
  margin: 8px 8px;
`;

export const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  z-index: 999;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const WeightWrapper = styled.View`
  background-color: ${colors.default.green};
  border: 1px solid ${colors.default.greenLight};
  border-radius: 4px;
  width: 40px;
  height: 22px;
  align-items: center;
  justify-content: center;
`;
export const WeightWrapperCategory = styled.View`
  background-color: ${colors.default.green};
  border: 1px solid ${colors.default.greenLight};
  border-radius: 4px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Weight = styled.Text`
  font-size: 11px;
  color: ${colors.default.textLight};
`;

export const Icon = styled(Feather)<{ favorite: boolean }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ favorite }) =>
    favorite ? colors.default.green : colors.default.gray};
`;

export const Img = styled.Image`
  flex: 1;
  width: 100%;
  height: 140px;
  margin: 8px 0;
  margin-top: 0;
  background-color: ${colors.default.bgGray};
`;

export const Footer = styled.View`
  padding: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 16px;
  text-align: left;
  width: 100%;
  padding: 2px 8px;
`;
export const TitleCategory = styled.Text`
  font-size: 10px;
  text-align: center;
  width: 100%;
  padding: 2px 8px;
  color: ${colors.default.textLight};
`;
export const TitleLoja = styled.Text`
  font-size: 12px;
  text-align: left;
  width: 100%;
  padding: 2px 8px;
`;

export const Price = styled.Text`
  color: ${colors.default.green};
  font-size: 22px;
  text-align: left;
  font-weight: 700;
  padding: 2px 8px;
`;

export const PromotionContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
`;

export const PromotionPrice = styled(Price)`
  font-size: 12px;
  text-decoration: line-through;
  color: ${colors.default.textGray};
`;
