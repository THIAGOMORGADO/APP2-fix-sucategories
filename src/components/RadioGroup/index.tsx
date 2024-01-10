import React from 'react';
import { Dimensions } from 'react-native';

import {
  Container,
  RadioItemContainer,
  RadioItemText,
} from './styles';

interface IRadioGroup {
  items: Array<{
    label: string;
    isChecked: boolean;
  }>;
  setRadioActive: React.Dispatch<React.SetStateAction<string>>;
}

interface IRadioItem {
  label: string;
  isChecked: boolean;
  setRadioActive: React.Dispatch<React.SetStateAction<string>>;
  itemWidth: number;
}

export const RadioGroup: React.FC<IRadioGroup> = ({
  items,
  setRadioActive,
}) => {
  const { width } = Dimensions.get('window');
  const itemWidth = Math.floor(
    (width - ((items.length - 1) * 16 + 32)) / items.length
  );
  return (
    <Container>
      {items.map((itemOpts, index) => (
        <RadioItem
          key={index}
          {...{ ...itemOpts, itemWidth, setRadioActive }}
        />
      ))}
    </Container>
  );
};

const RadioItem: React.FC<IRadioItem> = ({
  label,
  isChecked,
  setRadioActive,
  itemWidth,
}) => {
  return (
    <RadioItemContainer
      isChecked={isChecked}
      onPress={() => {
        setRadioActive(label);
      }}
      width={itemWidth}
    >
      <RadioItemText>{label}</RadioItemText>
    </RadioItemContainer>
  );
};
