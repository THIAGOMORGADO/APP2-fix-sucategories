import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../../constants/colors';

const winWidth = Dimensions.get('window').width;

interface ILine {
  isFirst?: boolean;
  isLast?: boolean;
  isActive: boolean;
}

export const Container = styled.ScrollView`
  padding: 8px;
`;

export const OrdersWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
  margin-bottom: 16px;
`;
export const Header = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrderWrapper = styled.TouchableOpacity`
  background-color: ${colors.default.bgLighter};
  width: ${`${winWidth - 32}px`};
  padding: 16px 16px 8px 16px;
  border-radius: 4px;
  margin: 8px;
`;

export const statusColor = (statusName: string) => {
  if (statusName === 'CANCELADA') return colors.default.red;
  if (statusName === 'AGUARDANDO_CONFIRMACAO')
    return colors.default.orange;

  return colors.default.green;
};

export const StatusText = styled.Text<{ statusName: string }>`
  font-size: 12px;
  color: ${({ statusName }) => statusColor(statusName)};
`;

export const TotalPrice = styled.Text`
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const CommonText = styled.Text`
  font-size: 12px;
  color: ${colors.default.textDark};
  margin-bottom: 4px;
`;

export const Btn = styled.TouchableOpacity<{ btnColor: string }>`
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ btnColor }) => btnColor};
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const BtnTxt = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
`;

export const InfoWrapper = styled.View`
  align-items: center;
`;

export const Devider = styled.View`
  height: 1px;
  background-color: #f0f0f0;
  margin-top: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 8px;
`;
