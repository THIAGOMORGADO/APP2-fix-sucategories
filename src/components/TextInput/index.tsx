import React from 'react';
import { Dimensions } from 'react-native';
import { HelperText } from 'react-native-paper';
import { type TextInputProps } from 'react-native-paper/src/components/TextInput/TextInput';

import NumberFormat from '../../utils/NumberFormat';

import { Container, Input, BtnWrapper, BtnTxt } from './styles';

interface ITextInputProps extends Omit<TextInputProps, 'theme'> {
  handleChange: any;
  handleBlur?: any;
  errors: any;
  values: any;
  icon?: string;
  name: string;
  label: string;
  mask?: 'currency' | 'weightInput';
  okBtn?: boolean | undefined;
}

export const TextInput: React.FC<ITextInputProps> = ({
  values,
  handleChange,
  handleBlur,
  errors,
  icon,
  name,
  label,
  mask,
  okBtn,
  ...rest
}) => {
  const handlerValue = () => {
    if (mask === 'currency') {
      return NumberFormat.currency(
        values[name],
        { isInputText: true },
        'BRA'
      );
    }
    if (mask === 'weightInput') {
      return NumberFormat.weightInput(values[name]);
    }

    return values[name];
  };

  const { width } = Dimensions.get('window');

  return (
    <>
      <Container>
        <Input
          label={label}
          value={handlerValue()}
          mode="outlined"
          onBlur={handleBlur?.(name)}
          onChangeText={handleChange(name)}
          secureTextEntry={[
            'password',
            'confirmation',
            'newPassword',
          ].some((i) => name === i)}
          autoCapitalize={
            ['email', 'password', 'confirmation', 'newPassword'].some(
              (i) => name === i
            )
              ? 'none'
              : undefined
          }
          left={icon && <Input.Icon name={icon} color="#4e4b4b" />}
          style={{
            width: !okBtn ? '100%' : width - 104,
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
        {okBtn && (
          <BtnWrapper>
            <BtnTxt>OK</BtnTxt>
          </BtnWrapper>
        )}
      </Container>
      <HelperText type="error" visible={!!errors[name]}>
        {errors[name]}
      </HelperText>
    </>
  );
};
