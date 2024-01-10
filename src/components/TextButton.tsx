import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FONTS, COLORS } from '../constants';

const TextButton = ({
  label,
  label2,
  labelStyle,
  disabled,
  buttonContainerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
      {label2 == 0 && (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: COLORS.white,
            ...FONTS.h3,
            ...labelStyle,
          }}
        >
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
