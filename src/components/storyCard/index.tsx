import React, { useEffect, useState } from 'react';
import {
  TouchableOpacityProps,
  ImageSourcePropType,
  Text,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import * as S from './styles';
import { COLORS, icons } from '../../constants';
import { useAuth } from '../../hooks/auth';

export interface StoryCardProps
  extends Pick<TouchableOpacityProps, 'style' | 'onPress'> {
  id: number;
  source: ImageSourcePropType;
  name: string;
  isFavourite?: boolean;
}

const StoryCard = ({
  id,
  name,
  source,
  isFavourite,
  ...args
}: StoryCardProps) => {
  const [favotite, setFavotite] = useState(isFavourite);
  const { favorites } = useAuth();

  useEffect(() => {
    favorites
      .getFavorites()
      .then((res) => setFavotite(res.includes(id)));
  }, []);

  const handlerFavorite = async (event: GestureResponderEvent) => {
    favorites.handleFavorites(id);
    setFavotite((prev) => !prev);
    event.stopPropagation();
  };

  return (
    <S.Container {...args}>
      <S.PictureContainer>
        <S.PictureContent>
          <S.Picture source={source} resizeMode={'stretch'} />
        </S.PictureContent>
      </S.PictureContainer>
      <S.TitleContainer>
        <S.Title>{name}</S.Title>
        <S.IconContainer>
          <Pressable onPress={handlerFavorite}>
            <S.Icon
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: favotite ? COLORS.primary : COLORS.gray,
              }}
            />
          </Pressable>
        </S.IconContainer>
      </S.TitleContainer>
    </S.Container>
  );
};

export default StoryCard;
