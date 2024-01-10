import {
  View,
  Text,
  TouchableOpacityProps,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import * as S from './styles';

export interface CategoryItemCardProps
  extends Pick<TouchableOpacityProps, 'style' | 'onPress'> {
  source: ImageSourcePropType;
  name: string;
}

const CategoryItemCard = ({
  name,
  source,
  ...args
}: CategoryItemCardProps) => {
  return (
    <S.Container {...args}>
      <S.Picture source={source} resizeMode={'cover'} />
      <S.TitleContainer>
        <S.Title>{name}</S.Title>
      </S.TitleContainer>
    </S.Container>
  );
};

export default CategoryItemCard;
