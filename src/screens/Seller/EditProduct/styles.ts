import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';
import { TextInput } from 'react-native-paper';

export const Container = styled.View`
  padding: 16px;
`;

export const Text = styled.Text``;

export const Input = styled(TextInput)`
  margin-bottom: 10px;
`;
export const SubTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 16px;
  color: ${colors.default.textGray};
  text-transform: uppercase;
`;

export const Form = styled.View`
  width: 100%;
`;

export const OpenCamera = styled.TouchableOpacity`
  padding: 8px 16px;
`;

export const ImgsContainer = styled.ScrollView`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${colors.default.gray};
  margin-bottom: 10px;
  /* flex-direction: row; */
`;

export const ImgsListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
`;

export const ImgsText = styled.Text`
  font-size: 14px;
  color: ${colors.default.textGray};
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
