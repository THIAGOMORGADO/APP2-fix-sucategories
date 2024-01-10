import { useEffect, useState } from 'react';

export const useDateInputController = (
  onChange?: (date: string) => void,
  label?: Date
) => {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState(false);
  const [value, setValue] = useState('');

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setValue(date.toLocaleDateString());
    onChange?.(date.toISOString());
    hideDatePicker();
  };

  useEffect(() => {
    label && setValue(label.toLocaleDateString());
  }, [label]);

  return {
    hideDatePicker,
    isDatePickerVisible,
    showDatePicker,
    handleConfirm,
    value,
  };
};
