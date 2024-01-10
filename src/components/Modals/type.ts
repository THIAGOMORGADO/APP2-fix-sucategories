import { type MaterialCommunityIcons } from '@expo/vector-icons';

export enum MessageTypes {
  'FAIL',
  'SUCCESS',
  'WARNING',
  'DECISION',
  'DANGERROUS_DECISION',
  'INFORMATION',
}

export type MessageIconNameType =
  keyof typeof MaterialCommunityIcons.glyphMap;

export interface MessageModalProps {
  messageType: MessageTypes;
  title: string;
  description: string;
  isVisible: boolean;
  handleContinue: () => any;
  handleCancel?: () => any;
}
