import React from 'react';
import { View } from 'react-native';
import {
  Checkbox as RnpCheckbox,
  TouchableRipple,
  HelperText,
} from 'react-native-paper';
import { Container, P } from './styles';

interface ICheck {
  isChecked: boolean;
  onPress: any;
  name: string;
  errors: any;
}

export const Checkbox: React.FC<ICheck> = ({
  isChecked,
  onPress,
  name,
  errors,
  children,
}) => {
  return (
    <>
      <TouchableRipple onPress={onPress}>
        <Container>
          <View pointerEvents="none">
            <RnpCheckbox.Android
              status={isChecked ? 'checked' : 'unchecked'}
              color="#28c17e"
            />
          </View>
          <P>{children}</P>
        </Container>
      </TouchableRipple>
      <HelperText type="error" visible={!!errors[name]}>
        {errors[name]}
      </HelperText>
    </>
  );
};
