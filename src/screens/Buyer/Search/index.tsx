import React, { useState, useEffect, useCallback } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  type CategoryType,
  ICategories,
  type IProduct,
  type IStore,
  IStores,
} from '../../../@types';
import { StoreCard } from '../../../components/Buyer/StoreCard';
import { useAuth } from '../../../hooks/auth';
import { Loader } from '../../../components/Loader';
import { api } from '../../../config/api';
import SearchBar from '../../../components/SearchBar';
import { CategoryCard } from '../../../components/Buyer/CategoryCard';
import { SuperCategoryCard } from '../../../components/Buyer/SuperCategoryCard';
import { ProductCard } from '../../../components/product/ProductCard';
import { NotFound } from '../../../components/NotFound';
import { colors } from '../../../constants/colors';

import {
  StoresWrapper,
  ListWrapper,
  GenericWrapper,
  SearchBarWrapper,
  CatListWrapper,
  Container,
  InputText,
  SearchIcon,
  InputWrapper,
  ViewNotFound,
} from './styles';

interface IFavorites {
  handleFavorites: (id: number) => Promise<void>;
  getFavorites: () => Promise<number[]>;
}

type IHandleSearch = (
  favoritesList: number[],
  favorites: IFavorites,
  result: {
    filteredStore: IStore[];
    filteredProduct: IProduct[];
    term: string;
    filteredCategory: CategoryType[];
    filteredSubCategory: CategoryType[];
  }
) => JSX.Element | JSX.Element[];

const HandleSearch: IHandleSearch = (
  favoritesList,
  favorites,
  {
    filteredStore,
    filteredProduct,
    term,
    filteredCategory,
    filteredSubCategory,
  }
) => {
  const Tab = createMaterialTopTabNavigator();

  const HandleStores: React.FC = () => (
    <GenericWrapper>
      {filteredStore.length > 0 ? (
        filteredStore.map((store: IStore) => (
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
        ))
      ) : (
        <ViewNotFound>
          <NotFound message="Nenhuma loja encontrada com esse termo" />
        </ViewNotFound>
      )}
    </GenericWrapper>
  );

  const HandleProducts = () => {
    return (
      <GenericWrapper>
        {filteredProduct.length > 0 ? (
          <ListWrapper>
            {filteredProduct.map((product: IProduct) => (
              <ProductCard
                key={product.id}
                data={{ ...product, isFavorite: false }}
                hideFavoriteIcon
              />
            ))}
          </ListWrapper>
        ) : (
          <ViewNotFound>
            <NotFound message="Nenhum produto encontrado com esse termo" />
          </ViewNotFound>
        )}
      </GenericWrapper>
    );
  };
  const HandleSubCategories = (): JSX.Element => {
    return (
      <GenericWrapper>
        {filteredSubCategory.length > 0 ? (
          <ListWrapper>
            {filteredSubCategory.map((category: CategoryType) => (
              <CategoryCard
                key={category.id}
                data={{ ...category }}
                title={''}
              />
            ))}
          </ListWrapper>
        ) : (
          <ViewNotFound>
            <NotFound message="Nenhuma Subcategoria encontrada com esse termo" />
          </ViewNotFound>
        )}
      </GenericWrapper>
    );
  };
  const HandleCategories = (): JSX.Element => {
    return (
      <GenericWrapper>
        {filteredCategory.length > 0 ? (
          <ListWrapper>
            {filteredCategory.map((category: CategoryType) => (
              <SuperCategoryCard
                key={category.id}
                data={{ ...category }}
                title={''}
              />
            ))}
          </ListWrapper>
        ) : (
          <ViewNotFound>
            <NotFound message="Nenhuma categoria encontrada com esse termo" />
          </ViewNotFound>
        )}
      </GenericWrapper>
    );
  };

  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   showLabel: false,
      //   showIcon: true,
      // }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarIcon: ({ focused }) => {
          const iconName =
            route.name === 'StoresResults'
              ? 'store'
              : route.name === 'ProductsResults'
                ? 'leaf'
                : 'microsoft';

          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={
                focused
                  ? colors.tabs.buyer.iconBlur
                  : colors.default.gray
              }
            />
          );
        },
      })}
    >
      <Tab.Screen name="ProductsResults" component={HandleProducts} />
      <Tab.Screen name="StoresResults" component={HandleStores} />
      <Tab.Screen
        name="SubCategoryResults"
        component={HandleSubCategories}
      />
      <Tab.Screen
        name="CategoryResults"
        component={HandleCategories}
      />
    </Tab.Navigator>
  );
};

export const SearchStores: React.FC<{ navigation: any }> = () => {
  const { favorites } = useAuth();
  const [favoritesList, setFavoritesList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [Subcategories, setSubCategories] = useState<CategoryType[]>(
    []
  );
  const [filteredProduct, setFilteredProduct] = useState<IProduct[]>(
    []
  ); // Receberá lista filtrada
  const [filteredStore, setFilteredStore] = useState<IStore[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<
    CategoryType[]
  >([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState<
    CategoryType[]
  >([]);
  const [masterData, setMasterData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [categoryNav, setCategoryNav] = useState(false);
  const [term, setTerm] = useState('');
  const [focus, setFocus] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const [stores, setStores] = useState<IStore[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const responseCategories = await api.get(
        `api/superCategory/v1/`
      );
      setCategories(responseCategories.data.data.content);

      const responseSubCategories = await api.get(`api/category/v1/`);
      setSubCategories(responseSubCategories.data.data.content);

      const responseStore = await api.get(`api/lojas/v1/`);
      setStores(responseStore.data.data.content);

      const responseProducts = await api.get(
        `api/lojas/v1/products/filters`
      );
      setProducts(responseProducts.data.data.content);
    })();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newProduct = products.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.includes(textData);
        }
      });
      const newStore = stores.filter(function (item) {
        console.log(item);
        if (item.firstName) {
          const itemData = item.firstName.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.includes(textData);
        }
      });
      const newCategory = categories.filter(function (item) {
        if (item.nome) {
          const itemData = item.nome.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.includes(textData);
        }
      });

      const newSubCategory = Subcategories.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.includes(textData);
        }
      });
      setFilteredProduct(newProduct);
      setFilteredStore(newStore);
      setFilteredCategory(newCategory);
      setFilteredSubCategory(newSubCategory);
      setInputVal(text);
    } else {
      setFilteredProduct(products);
      setFilteredStore(stores);
      setFilteredCategory(categories);
      setFilteredSubCategory(Subcategories);
      setInputVal(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBarWrapper>
        <Container>
          <InputWrapper focus={focus}>
            <SearchIcon name="search" />
            <InputText
              keyboardType="web-search"
              returnKeyType="search"
              placeholder="pesquisar, produtos, lojas, categorias e subcategorias"
              onChangeText={(text) => {
                searchFilter(text);
              }}
              value={inputVal}
              onFocus={() => {
                setFocus(true);
              }}
            />
          </InputWrapper>
        </Container>
      </SearchBarWrapper>
      <StoresWrapper>
        {HandleSearch(favoritesList, favorites, {
          filteredStore,
          filteredProduct,
          term,
          filteredCategory,
          filteredSubCategory,
        })}
      </StoresWrapper>
    </SafeAreaView>
  );
};
export default SearchStores;
