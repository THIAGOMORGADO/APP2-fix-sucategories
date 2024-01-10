import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Title as TitleComponent } from '../../../components/Title';

const winWidth = Dimensions.get('screen').width;
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fdfdfd;
`;

export const TextWrapper = styled.Text`
  width: ${`${winWidth}px`};
  justify-content: center;
  align-items: center;
`;

export const Divisor = styled.View`
  padding: 4px;
`;

export const Title = styled(TitleComponent)`
  width: ${`${winWidth}px`};
  text-align: center;
  align-items: center;
`;

export const Img = styled.Image`
  margin: 50px 0;
`;

export const CheckLinkWrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Form = styled.View`
  width: 100%;
  padding: 16px;
`;

export const ForgotPass = styled.TouchableOpacity`
  margin: 5px 0 20px 0;
`;

export const ForgotPassText = styled.Text`
  width: 100%;
  text-align: right;
  color: #28c17e;
`;

export const GoSignUp = styled.TouchableOpacity`
  margin: 10px 0 20px 0;
`;

export const GoSignUpText = styled.Text`
  width: 100%;
  text-align: right;
`;

export const Green = styled.Text`
  color: #28c17e;
  display: flex;
`;

export const Icon = styled(FontAwesome5)``;
