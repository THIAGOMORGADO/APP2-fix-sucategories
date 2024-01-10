import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { type IStore } from '../../../@types';
import { Title } from '../../../components/Title';
import { StoreCard } from '../../../components/Buyer/StoreCard';
import { useAuth } from '../../../hooks/auth';
import {
  StoresWrapper,
  ListWrapper,
  Empty,
  EmptyWrapper,
} from './styles';
import { api } from '../../../config/api';
import { NotFound } from '../../../components/NotFound';

const FavoriteStores: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { favorites } = useAuth();
  const [favoritesList, setFavoritesList] = useState([] as number[]);

  const [stores, setStores] = useState<IStore[]>([]);

  const getFavoritesList = useCallback(() => {
    (async () => {
      const favoritesArr = await favorites.getFavorites();
      setFavoritesList(favoritesArr);
      try {
        const response = await api.get('api/lojas/v1');
        setStores(response.data.data.content);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [setStores, setFavoritesList, favorites]);

  useEffect(() => {
    (async () => {
      const listener = navigation.addListener(
        'focus',
        getFavoritesList
      );

      return listener;
    })();
  }, [navigation]);

  return (
    <ScrollView>
      <StoresWrapper>
        <Title fontSize="20px">Meus favoritos</Title>
        {favoritesList.length > 0 ? (
          <ListWrapper scrollEnabled>
            {stores
              .filter((item) =>
                favoritesList.some((key) => key === item.id)
              )
              .map((store: any) => (
                <StoreCard
                  key={store.id}
                  data={{ ...store, isFavorite: true }}
                  handleFavorites={async (id) => {
                    await favorites.handleFavorites(id);
                    getFavoritesList();
                  }}
                  hideFavoriteIcon
                />
              ))}
          </ListWrapper>
        ) : (
          <NotFound message="Não há lojas na sua lista de favoritos" />
        )}
      </StoresWrapper>
    </ScrollView>
  );
};

export default FavoriteStores;
