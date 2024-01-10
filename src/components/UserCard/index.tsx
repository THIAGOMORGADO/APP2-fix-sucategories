// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { type TouchableOpacityProps } from 'react-native-ui-lib';

import {
  Container,
  Title,
  Icon,
  IconWrap,
  Description,
  TextWrap,
} from './styles';

interface IUserCard extends TouchableOpacityProps {
  icon: string;
  title: string;
  description: string;
  background?: string;
}

export const UserCard: React.FC<IUserCard> = ({
  title,
  description,
  icon,
  background,
  ...rest
}) => {
  const bgColor = (hsl: string): string => {
    const hslaArr = hsl.split(',');
    const newHsla = hslaArr.map((item, index) => {
      if (index === 2) {
        let light = parseInt(item.substr(0, item.length - 1));
        light = light > 10 ? light - 10 : 0;
        return ` ${light}%`;
      }
      if (index === 3) return ' 1)';

      return item;
    });

    return newHsla.join(',');
  };

  return (
    <Container {...rest}>
      <IconWrap>
        <Icon name={icon} size={36} color="#fff" />
      </IconWrap>
      <TextWrap>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrap>
    </Container>
  );
};
