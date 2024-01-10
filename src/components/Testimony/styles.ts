import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const ModalArea = styled.View`
  flex: 1;
  background-color: #fff;
`;
export const ModalAreaView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;
export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;
export const ModalClose = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.default.green};
  border-radius: 20px;
`;
export const ModalCloseText = styled.Text``;
export const ModalTitle = styled.Text`
  margin-left: 20px;
  font-size: 18px;
  color: ${colors.default.green};
  font-weight: bold;
`;
export const ModalInput = styled.TextInput`
  margin-left: 20px;
  font-size: 18px;
  color: #000;
`;
export const ModalResults = styled.View``;
export const ModalResult = styled.TouchableHighlight`
  padding: 15px;
`;
export const ModalResultText = styled.Text`
  color: #000;
  font-size: 16px;
`;

export const DriverHeadline = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`;

export const DriverAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;
export const DriverName = styled.Text`
  margin: 20px;
  font-size: 25px;
  font-weight: bold;
  color: #000;
`;
export const DriverStars = styled.Text`
  color: #999;
  font-size: 17px;
`;
export const DriverCarInfo = styled.View`
  width: 100%;
  margin: 20px;
  border-top-width: 1px;
  border-top-color: #999;
  border-bottom-width: 1px;
  border-bottom-color: #999;
  align-items: center;
  padding: 20px;
`;
export const DriverCar = styled.Text`
  font-size: 17px;
  color: #000;
`;
export const DriverColor = styled.Text`
  font-size: 15px;
  color: #999;
`;
export const DriverPlate = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const TripButton = styled.TouchableHighlight`
height:50px;,
background-color:#3574CB;
border-radius:5px;
justify-content:center;
align-items:center;
width:80%;
`;

export const TripButtonText = styled.Text`
  font-size: 17px;
  color: #fff;
`;

export const RatingTitle = styled.Text`
  margin: 20px;
  font-size: 15px;
  color: #000;
`;
