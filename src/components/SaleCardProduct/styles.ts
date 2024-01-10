import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const CardContainer = styled.View`
  padding: 8px;
  margin: 8px;
  border: 1px solid ${colors.default.gray};
  border-radius: 4px;
`;

export const CardProductName = styled.Text`
  font-weight: 700;
  font-size: 14px;
  color: ${colors.default.textDark};
`;

export const CardTextWrapper = styled.View`
  margin: 8px 0;
  flex-direction: row;
  flex-grow: 1;
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

export const InfoWrapper = styled.View`
  flex-direction: row;
`;
