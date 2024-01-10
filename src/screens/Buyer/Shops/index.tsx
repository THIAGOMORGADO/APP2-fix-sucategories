import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  type IStore,
  type IStores,
  type IRoute,
} from '../../../@types';
import { StoreCard } from '../../../components/Buyer/StoreCard';
import { useAuth } from '../../../hooks/auth';
import { StoresWrapper } from './styles';
import { api } from '../../../config/api';
import { NotFound } from '../../../components/NotFound';
import { errorHandler } from '../../../utils/errorInstance';
import { colors } from '../../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

import { serializeObjectToQueryParams } from '../../../helpers/serealize';

type RequestParam =
  | undefined
  | {
      category: number;
    };

export interface ShopsProps {
  navigation: any;
  route: IRoute;
}

export const Shops = ({ navigation, route }: ShopsProps) => {
  const { favorites } = useAuth();
  const [favoritesList, setFavoritesList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<IStore[]>([]); // Receberá lista filtrada
  const [masterData, setMasterData] = useState<IStore[]>([]); // Lista a ser renderizada
  const [text, setText] = useState(''); // Controla value do input
  const [active, setActive] = useState(false);
  const [storeList, setStoreList] = useState<IStore[]>([]);

  const getStores = useCallback(() => {
    const requestParams: RequestParam = {
      category: route.params.id,
    };
    const nullParams: RequestParam = {
      category: 0,
    };
    (async () => {
      setIsLoading(true);
      const favoritesArr = await favorites.getFavorites();
      setFavoritesList(favoritesArr);
      try {
        const response = await api.get(
          `api/lojas/v1?${serializeObjectToQueryParams(
            route.params.store ? requestParams : nullParams
          )}`
        );
        const stores: IStores = response.data.data;
        setFilteredData(response.data.data.content);
        setMasterData(response.data.data.content);

        setStoreList(stores.content);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler(e, 'api/lojas/v1', () => {});
      }
      setIsLoading(false);
    })();
  }, [favorites]);
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        if (item.nomeLoja) {
          const itemData = item.nomeLoja.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setText(text);
    } else {
      setFilteredData(masterData);
      setText(text);
    }
  };

  const onRefresh = useCallback(() => {
    getStores();
  }, [getStores]);

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,

      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {!active && (
            <TouchableOpacity
              onPress={() => {
                setActive(true);
              }}
              style={{ marginRight: 20 }}
            >
              <AntDesign
                name="search1"
                size={24}
                color={colors.tabs.buyer.iconFocused}
              />
            </TouchableOpacity>
          )}
        </View>
      ),

      headerTitle: active
        ? () => (
            <>
              {active && (
                <TextInput
                  placeholderTextColor={'white'}
                  value={text}
                  onChangeText={(t) => {
                    searchFilter(t);
                  }}
                  autoFocus={true}
                  placeholder="Pesquisar loja?"
                  style={{
                    width: '100%',
                    height: 50,
                    fontSize: 18,
                    color: 'white',
                  }}
                />
              )}
            </>
          )
        : 'Lojas',
    });
  }, [navigation]);

  return (
    <StoresWrapper>
      <FlatList
        data={filteredData}
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

export default Shops;
