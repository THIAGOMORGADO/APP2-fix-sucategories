import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const TxtLabel = styled.Text`
  color: #333;
`;

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const ModalContainer = styled.View`
  flex: 1;
  margin: 12px;
`;

export const ListContainer = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ListItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: #dfdfdf;
  padding: 12px 0;
`;

export const ListItem = styled.Text`
  font-weight: 700;
  text-transform: uppercase;
`;

export const SearchInput = styled.TextInput`
  background: #fdfdfd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
`;

export const Button = styled.TouchableOpacity`
  background: ${colors.default.green};
  border-radius: 4px;
  padding: 12px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;

export const SelectListContainer = styled.TouchableOpacity`
  padding: 18px 12px;
  margin-bottom: 12px;
  border: 1px solid #777;
  margin-top: 8px;
`;

export const SelectListText = styled.Text``;

export const Error = styled.Text`
  margin-top: -8px;
  margin-left: 8px;
  margin-bottom: 8px;
`;
