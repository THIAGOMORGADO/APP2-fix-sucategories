import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { type IStore, type IStores } from '../../../@types';
import { SuperCategoryCard } from '../../../components/Buyer/SuperCategoryCard';
import { useAuth } from '../../../hooks/auth';
import { StoresWrapper } from './styles';
import { api } from '../../../config/api';
import { colors } from '../../../constants/colors';
import { NotFound } from '../../../components/NotFound';
import { errorHandler } from '../../../utils/errorInstance';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export const SuperCategory: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { favorites } = useAuth();
  const [favoritesList, setFavoritesList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // Receberá lista filtrada
  const [masterData, setMasterData] = useState([]); // Lista a ser renderizada
  const [text, setText] = useState(''); // Controla value do input
  const [active, setActive] = useState(false);

  const [storeList, setStoreList] = useState<IStore[]>([]);
  const getStores = useCallback(() => {
    (async () => {
      setIsLoading(true);
      const favoritesArr = await favorites.getFavorites();
      setFavoritesList(favoritesArr);
      try {
        const response = await api.get('api/superCategory/v1');
        const stores: IStores = response.data.data;

        setStoreList(stores.content);
        setFilteredData(response.data.data.content);
        setMasterData(response.data.data.content);

        // console.log(response.data.data.content)
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler(e, 'api/lojas/v1', () => {});
      }
      setIsLoading(false);
    })();
  }, [favorites]);

  useEffect(() => {
    (async () => {
      getStores();
    })();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        if (item.nome) {
          const itemData = item.nome.toUpperCase();
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
                placeholder="Pesquisar categoria?"
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
      : 'Categorias',
  });

  const onRefresh = useCallback(() => {
    getStores();
  }, [getStores]);

  return (
    <StoresWrapper>
      <FlatList
        data={filteredData}
        renderItem={({ item: store }) => (
          <SuperCategoryCard
            key={store.id}
            data={{ ...store }}
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

export default SuperCategory;
