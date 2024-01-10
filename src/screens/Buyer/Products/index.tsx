import React, { useEffect, useState, useContext } from 'react';
import { type IProduct, type IRoute } from '../../../@types';
import { ProductsWrapper } from './styles';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProductList } from '../../../components/product/ProductList';
import { useProductsAPI } from '../../../hooks/products';

import Testimony from '../../../components/Testimony';
import { UserContext } from '../../../contexts/UserContext';
import { colors } from '../../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

export const Products: React.FC<{
  navigation: any;
  route: IRoute;
}> = ({ navigation, route }) => {
  const {
    isLoading,
    isLastPage,
    favoritesList,
    products,
    hasReachedTheFinalPage,
    getProducts,
    onRefresh,
  } = useProductsAPI(
    route.params.id,
    64,
    route.params.category,
    route.params.store
  );

  const [filteredData, setFilteredData] = useState<IProduct[]>([]); // Receberá lista filtrada
  const [masterData, setMasterData] = useState(products); // Lista a ser renderizada
  const [text, setText] = useState(''); // Controla value do input
  const [active, setActive] = useState(false);
  const handleRequestMore = (): void => {
    if (!hasReachedTheFinalPage()) {
      getProducts(false, true);
    }
  };

  useEffect(() => {
    onRefresh();
    if (active) {
      setFilteredData(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = products.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.includes(textData);
        }
      });
      setFilteredData(newData);
      setText(text);
    } else {
      setFilteredData(products);
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
                placeholder="Pesquisar produtos?"
                style={{
                  width: '100%',
                  height: 50,
                  fontSize: 20,
                  color: 'white',
                }}
              />
            )}
          </>
        )
      : 'Produtos',
  });

  const { dispatch: userDispatch, state } = useContext(UserContext);

  return (
    <ProductsWrapper>
      <ProductList
        products={
          active ? (text == '' ? products : filteredData) : products
        }
        favoritesList={favoritesList}
        route={route}
        isLoading={isLoading}
        isLastPage={isLastPage}
        hideFavoriteIcon={false}
        onRefresh={onRefresh}
        onEndReached={handleRequestMore}
        store={route.params.store}
      />
    </ProductsWrapper>
  );
};
