import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('screen');

export const ProductsTitle = styled.Text`
  color: ${colors.default.textDark};
  font-weight: 400;
  font-size: 24px;
`;

export const Info = styled.View`
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const InfoColumn = styled.View`
  flex: 1;
  align-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const CardTextWrapper = styled.View`
  margin: 2px;
  flex-direction: column;
`;

export const CardCommonText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const CardCommonInfo = styled.Text`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.default.textDark};
`;

export const Wrapper = styled.View<{ status: string }>`
  padding: 8px;
  background-color: ${colors.default.bgLighter};
  border-radius: 4px;
  width: ${() => `${width - 32}px`};
  margin: 8px;
  elevation: 2;
  opacity: ${({ status }) => (status === 'CANCELADA' ? 0.75 : 1)};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 8px;
  margin-bottom: 8px;
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

export const BtnText = styled.Text`
  color: ${colors.default.green};
  font-size: 14px;
`;

export const BtnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text<{ status: string }>`
  text-align: right;
  font-size: 13px;
  color: ${({ status }) =>
    status === 'CANCELADA'
      ? colors.default.textDark
      : colors.default.textGray};
  margin: 4px 8px 4px 4px;
  font-weight: ${({ status }) =>
    status === 'CANCELADA' ? 700 : 400};
`;
