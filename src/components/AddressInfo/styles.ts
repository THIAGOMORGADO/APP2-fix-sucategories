import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('screen');

export const CommonText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const CommonInfo = styled.Text`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.default.textDark};
`;

export const TextWrapper = styled.View`
  margin: 8px;
  flex-direction: row;
`;

export const AddressWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.View`
  border-radius: 4px;
  border: 1px solid ${colors.default.gray};
  margin: 8px;
  padding-bottom: 8px;
  width: ${`${width / 2 - 40}px`};
`;

export const AddressTextWrapper = styled.View`
  flex-direction: row;
  margin-left: 8px;
`;

export const BtnMap = styled.TouchableOpacity`
  padding: 8px;
  flex-direction: row;
  align-items: center;
`;

export const BtnMapText = styled.Text`
  font-size: 12px;
  color: ${colors.default.green};
  margin-left: 4px;
`;

export const Icon = styled(SimpleLineIcons)`
  color: ${colors.default.green};
  font-size: 12px;
`;
