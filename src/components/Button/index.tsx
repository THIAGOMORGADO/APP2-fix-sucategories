import React, { Children } from 'react';
import {
  ButtonText,
  Btn,
  IsMoreContainer,
  ButtonMoreText,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface ButtonProps {
  upper?: boolean;
  onPress?: () => void;
  marginLeft?: boolean;
  width?: number;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  children?: React.ReactNode | string;
  isMore?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  width,
  upper,
  onPress,
  marginLeft,
  textColor,
  backgroundColor,
  disabled,
  isMore,
}) => {
  return !isMore ? (
    <Btn
      onPress={onPress}
      width={width}
      marginLeft={marginLeft}
      mode="contained"
      backgroundColor={backgroundColor}
      disabled={disabled}
    >
      <ButtonText upper={upper} textColor={textColor}>
        {children}
      </ButtonText>
      {/* <IconContainer /> */}
    </Btn>
  ) : (
    <IsMoreContainer onPress={onPress}>
      <AntDesign
        name="pluscircle"
        color={colors.default.green}
        size={children ? 22 : 28}
      />
      {children && (
        <ButtonMoreText textColor={colors.default.green}>
          {children}
        </ButtonMoreText>
      )}
    </IsMoreContainer>
  );
};
