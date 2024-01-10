import React, { useState, useContext } from 'react';
import { Modal, View, TouchableHighlight } from 'react-native';
import { colors } from '../../constants/colors';
import {
  ModalArea,
  ModalHeader,
  ModalAreaView,
  ModalCloseText,
  ModalClose,
  DriverHeadline,
  DriverAvatar,
  DriverName,
  DriverStars,
  DriverCarInfo,
  DriverCar,
  DriverColor,
  DriverPlate,
  TripButton,
  TripButtonText,
  RatingTitle,
  ModalInput,
} from './styles';
import { AirbnbRating } from 'react-native-ratings';
import { TextInput } from '../TextInput';
import { UserContext } from '../../contexts/UserContext';

export default (props) => {
  const [results, setResults] = useState([]);
  const [searchText, setSeachText] = useState('');
  const [showStars, setShowStars] = useState(true);
  const { dispatch: userDispatch, state } = useContext(UserContext);

  const handleCloseAction = () => {
    userDispatch({
      type: 'setModal',
      payload: {
        modal: false,
      },
    });
    props.visibleAction(state.modal);
  };

  const handleClose = () => {
    setResults([]);
    setSeachText('');
  };

  const handleResultClick = (item) => {
    props.clickAction(props.field, item);
    props.visibleAction(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onShow={handleClose}
    >
      <ModalArea>
        <ModalHeader>
          <ModalClose onPress={handleCloseAction}>
            <ModalCloseText>X</ModalCloseText>
          </ModalClose>
        </ModalHeader>

        <ModalAreaView>
          <DriverHeadline>Avalie essa loja</DriverHeadline>
          <DriverAvatar
            source={require('../../../assets/images/icon.png')}
          />
          <DriverName>Loja</DriverName>
          <DriverStars> 0 estrelas</DriverStars>
          {!showStars && (
            <>
              <DriverCarInfo>
                <DriverCar>Teste</DriverCar>
                <DriverColor>props.driver.carColor</DriverColor>
                <DriverPlate>props.driver.carPlate</DriverPlate>
              </DriverCarInfo>
              <TripButton
                onPress={() => {
                  alert('encerrou');
                }}
              >
                <TripButtonText>Encerrar Viagem</TripButtonText>
              </TripButton>
            </>
          )}
          {showStars && (
            <>
              <AirbnbRating
                count={5}
                reviews={[
                  'Terrível',
                  'Ruim',
                  'Boa',
                  'Muito boa',
                  'Ótima',
                ]}
                defaultRating={5}
              />
              <View style={{ width: '80%', marginTop: 15 }}>
                <TextInput
                  label="Depoimento"
                  errors={''}
                  name="Observação"
                  handleChange={() => {
                    console.log('');
                  }}
                  values={''}
                  mode="outlined"
                />
              </View>
              <TouchableHighlight
                onPress={() => {
                  console.log('clicou');
                }}
                style={{
                  backgroundColor: colors.default.green,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                  height: 50,
                }}
              >
                <TripButtonText>Avaliar</TripButtonText>
              </TouchableHighlight>
            </>
          )}
        </ModalAreaView>
      </ModalArea>
    </Modal>
  );
};
