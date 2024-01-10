import React, { useState } from 'react';
import { Modal } from 'react-native';
import * as Linking from 'expo-linking';
import { colors } from '../../constants/colors';
import { useAuth } from '../../hooks/auth';

import {
  ModalContainer,
  Icon,
  MenuItemWrapper,
  IconWrapper,
  MenuTxt,
  BtnClose,
} from './styles';

interface IModalMenu {
  signOut: any;
}

export const ModalMenu: React.FC<IModalMenu> = ({
  signOut,
}: IModalMenu) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <BtnClose>
            <Icon
              name="x"
              color={colors.default.textDark}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </BtnClose>

          <MenuItemWrapper
            onPress={async () =>
              await Linking.openURL(
                'mailto:fieldright@fieldright.com.br'
              )
            }
          >
            <IconWrapper>
              <Icon
                name="mail"
                size={20}
                color={colors.default.green}
              />
            </IconWrapper>
            <MenuTxt>Contatar o Suporte</MenuTxt>
          </MenuItemWrapper>

          <MenuItemWrapper onPress={() => signOut(user.id)}>
            <IconWrapper>
              <Icon
                name="log-out"
                size={20}
                color={colors.default.green}
              />
            </IconWrapper>
            <MenuTxt>Sair</MenuTxt>
          </MenuItemWrapper>
        </ModalContainer>
      </Modal>
      <Icon
        name="menu"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </>
  );
};
