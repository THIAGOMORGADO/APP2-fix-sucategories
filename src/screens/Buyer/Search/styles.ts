import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const winWidth = Dimensions.get('window').width;
export const Category = styled.View`
  padding: 16px 8px;
  background-color: ${colors.default.bgLighter};
`;

export const CategoryWrapper = styled.ScrollView`
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: 400;
  font-size: 16px;
  margin-left: 8px;
`;

export const StoresWrapper = styled.View`
  flex: 1;
`;

export const ListWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  flex-grow: 0;
`;
export const ViewNotFound = styled.View`
  justify-content: center;
  align-items: center;
`;
export const CatListWrapper = styled.ScrollView`
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 0;
  padding-left: 8px;
`;

export const GenericWrapper = styled.ScrollView`
  margin: 8px;
`;

export const SearchBarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 16px 0 16px;
`;

export const InputWrapper = styled.View<{ focus: boolean }>`
  background-color: ${colors.default.bgLighter};
  border-radius: 25px;
  padding: 6px 16px;
  width: ${({ focus }) => (focus ? `${winWidth - 40}px` : '100%')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled(FontAwesome5)`
  color: #bababa;
  font-size: 16px;
`;

export const InputText = styled.TextInput`
  width: 100%;
  border: none;
  flex-shrink: 1;
  padding-left: 4px;
  height: 32px;
`;

export const Btn = styled.TouchableOpacity`
  width: 74px;
`;

export const BtnTxt = styled.Text`
  color: ${colors.default.green};
  margin-right: 16px;
`;

export const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  border-radius: 5px;
  background-color: ${colors.default.bgLighter};
  width: 100%;
`;

export const TxtBack = styled.Text`
  color: ${colors.default.green};
  font-size: 16px;
  margin-left: 16px;
`;

export const IConBack = styled(FontAwesome5)`
  color: ${colors.default.green};
  font-size: 24px;
`;
