import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { type IStore } from '../../../@types';

import {
  Container,
  Header,
  Icon,
  Img,
  Title,
  InfoWrapper,
  TextWrapper,
} from './styles';
import { handleImg } from '../../../utils/handleImg';
import { logoNotFound } from '../../../constants/imgNotFound';
import { type BuyerTabScreenProps } from '../../../types/navigation';

interface IData extends IStore {
  isFavorite: boolean;
  name: string;
  fullName: string;
}

interface IStoreCard {
  data: IData;
  handleFavorites: (id: number) => Promise<void>;
  hideFavoriteIcon?: boolean;
}

export const StoreCard: React.FC<IStoreCard> = ({
  data,
  handleFavorites,
  hideFavoriteIcon,
}) => {
  const navigation = useNavigation<BuyerTabScreenProps>();
  const [favorite, setFavorite] = useState(data.isFavorite);
  const [height, setHeight] = useState(0);

  const getSize = useCallback(async () => {
    try {
      await fetch(data.avatar).then(async (response) => {
        if (response.status === 404) {
          setHeight(75);
          return;
        }
        if (handleImg(data.avatar)) {
          await Image.getSize(
            data.avatar,
            (width: number, height: number) => {
              const ratio = (width * 100) / 75;
              setHeight(height * ratio);
            }
          );
        } else {
          setHeight(75);
        }
      });
    } catch (e) {
      setHeight(75);
    }
  }, []);
  getSize();
  const handleFavorite = (id: number) => {
    handleFavorites(id);
    setFavorite(!favorite);
  };

  return (
    <Container
      onPress={() => {
        navigation.navigate('Products', {
          category: '',
          id: data.id,
          store: true,
        });
      }}
    >
      <Header>
        {!hideFavoriteIcon && (
          <Icon
            name="heart"
            favorite={favorite}
            onPress={() => {
              handleFavorite(data.id);
            }}
          />
        )}
      </Header>
      <InfoWrapper>
        {handleImg(data.avatar) &&
        data.avatar.split('images/')[1].length > 0 ? (
          <Image
            style={{
              width: 120,
              height: 120,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
            source={{
              uri: data.avatar,
              // headers: { Authorization: 'Bearer ' },
              // priority: Image.priority.high,
            }}
            resizeMode={'cover'}
          />
        ) : null}
        <TextWrapper>
          <Title>{data.fullName}</Title>
        </TextWrapper>
      </InfoWrapper>
    </Container>
  );
};
