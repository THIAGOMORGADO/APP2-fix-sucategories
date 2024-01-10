import { Pressable, View } from 'react-native';
import React from 'react';

import RNDateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { useDateInputController } from './controller';

export interface DateInputProps
  extends Omit<
    DateTimePickerProps,
    'onConfirm' | 'onCancel' | 'onChange'
  > {
  label?: string;
  value?: Date;
  error?: boolean;
  onChange?: (date: string) => void;
}

const DateInput = ({
  value: vl,
  label,
  onChange,
  error,
  ...args
}: DateInputProps) => {
  const {
    showDatePicker,
    isDatePickerVisible,
    handleConfirm,
    value,
    hideDatePicker,
  } = useDateInputController(onChange, vl);

  return (
    <Pressable onPressIn={showDatePicker}>
      <TextInput
        label={label}
        editable={false}
        value={value}
        error={error}
        mode="outlined"
        style={{
          marginBottom: 20,
        }}
      />
      <RNDateTimePicker
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        collapsable={false}
        {...args}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
};

export default DateInput;
