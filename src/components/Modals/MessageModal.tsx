import React, { type FC } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '../Button';

import {
  Content,
  ContentDescription,
  ContentTitle,
  FooterContainer,
  MessageIconContainer,
  Pressable,
  ViewContent,
} from './style';

import {
  MessageTypes,
  type MessageIconNameType,
  type MessageModalProps,
} from './type';

export const MessageModal: FC<MessageModalProps> = ({
  messageType = MessageTypes.WARNING,
  description,
  handleContinue,
  isVisible,
  title,
  handleCancel = () => {},
}) => {
  let messageIconNameType: MessageIconNameType =
    'information-variant';
  let messageColor: string = '#0284c7';

  switch (messageType) {
    case MessageTypes.FAIL:
      messageIconNameType = 'close';
      messageColor = '#ef4444';
      break;
    case MessageTypes.DANGERROUS_DECISION:
      messageIconNameType = 'alert-circle-check';
      messageColor = '#ef4444';
      break;
    case MessageTypes.DECISION:
      messageIconNameType = 'alert-circle-check';
      messageColor = '#d97706';
      break;
    case MessageTypes.INFORMATION:
      messageIconNameType = 'close';
      messageColor = '#0284c7';
      break;
    case MessageTypes.SUCCESS:
      messageIconNameType = 'check';
      messageColor = '#16a34a';
      break;
    case MessageTypes.WARNING:
      messageIconNameType = 'information-variant';
      messageColor = '#0284c7';
      break;
    default:
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <Pressable>
        <ViewContent
          style={{
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 5,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <MessageIconContainer backgroundColor={messageColor}>
            <MaterialCommunityIcons
              name={messageIconNameType}
              color={'#fff'}
              size={35}
            />
          </MessageIconContainer>

          <Content>
            <ContentTitle>{title}</ContentTitle>
            <ContentDescription>{description}</ContentDescription>

            {messageType === MessageTypes.DANGERROUS_DECISION ||
            messageType === MessageTypes.DECISION ? (
              <FooterContainer>
                <TouchableOpacity onPress={handleCancel}>
                  <ContentDescription>Cancelar</ContentDescription>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleContinue}
                  style={{
                    backgroundColor: messageColor,
                  }}
                >
                  <ContentDescription>Ok</ContentDescription>
                </TouchableOpacity>
              </FooterContainer>
            ) : (
              <Button
                onPress={handleContinue}
                width={40}
                backgroundColor={messageColor}
              >
                Ok
              </Button>
            )}
          </Content>
        </ViewContent>
      </Pressable>
    </Modal>
  );
};
