import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.ScrollView`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${colors.default.gray};
  margin-bottom: 10px;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${colors.default.textGray};
`;

export const IconWrapper = styled.View`
  position: absolute;
  z-index: 9;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  color: ${colors.default.red};
  font-size: 24px;
  font-weight: 700;
`;

export const ListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
`;

export const MiniatureWrapper = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 4px;
`;
