import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

interface IRadioItemContainer {
  isChecked: boolean;
  width: number;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const RadioItemContainer = styled.TouchableOpacity<IRadioItemContainer>`
  background-color: ${({ isChecked }) =>
    isChecked ? colors.default.green : colors.default.bgGray};
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export const RadioItemText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${colors.default.textLight};
  text-align: center;
`;
