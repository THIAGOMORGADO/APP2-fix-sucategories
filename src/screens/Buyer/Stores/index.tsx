import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { type IStore, type IStores } from '../../../@types';
import { StoreCard } from '../../../components/Buyer/StoreCard';
import { useAuth } from '../../../hooks/auth';
import { StoresWrapper } from './styles';
import { api } from '../../../config/api';
import { NotFound } from '../../../components/NotFound';
import { errorHandler } from '../../../utils/errorInstance';

export const Stores: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { favorites } = useAuth();
  const [favoritesList, setFavoritesList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [storeList, setStoreList] = useState<IStore[]>([]);
  const getStores = useCallback(() => {
    (async () => {
      setIsLoading(true);
      const favoritesArr = await favorites.getFavorites();
      setFavoritesList(favoritesArr);
      try {
        const response = await api.get('api/lojas/v1');
        const stores: IStores = response.data.data;

        setStoreList(stores.content);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler(e, 'api/lojas/v1', () => {});
      }
      setIsLoading(false);
    })();
  }, [favorites]);

  const onRefresh = useCallback(() => {
    getStores();
  }, [getStores]);

  useEffect(() => {
    (async () => {
      // const listener = navigation.addListener('focus', getStores);

      // return listener;
      getStores();
    })();
  }, []);

  return (
    <StoresWrapper>
      <FlatList
        data={storeList}
        renderItem={({ item: store }) => (
          <StoreCard
            key={store.id}
            data={{
              ...store,
              isFavorite: favoritesList.some(
                (key) => key === store.id
              ),
            }}
            handleFavorites={favorites.handleFavorites}
          />
        )}
        ListEmptyComponent={
          <NotFound
            message="Nenhuma loja encontrada"
            isLoading={isLoading}
          />
        }
        // ListFooterComponent={<Loader />}
        initialNumToRender={4}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.3}
      />
    </StoresWrapper>
  );
};

export default Stores;
