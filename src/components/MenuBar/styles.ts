import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${colors.default.green};
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextWraper = styled.View`
  width: 100%;
  height: 45%;
  align-items: center;
  padding: 20px;
`;
export const Icon = styled(Feather)<{ margin?: boolean }>`
  color: ${colors.default.textLight};
  font-size: 24px;
  ${({ margin }) =>
    margin &&
    css`
      margin-right: 20px;
    `};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.default.textLight};
  font-weight: 700;
`;
