import React, { useEffect, useState, useCallback } from 'react';
import { IRoute } from '../../../@types';
import { TextInput, View } from 'react-native';
import {
  ProductsWrapper,
  ProductsHeader,
  ProductsTitle,
  ProductsNewBtn,
  Icon,
  ProductsNewBtnText,
} from './styles';
import {
  CategoryType,
  ICategories,
  IStore,
  IStores,
  IProduct,
} from '../../../@types';
import { api } from '../../../config/api';
import { ProductList } from '../../../components/product/ProductList';
import { useProductsAPI } from '../../../hooks/products';
import { useAuth } from '../../../hooks/auth';
import { AntDesign } from '@expo/vector-icons';
type ProductsComponentProps = {
  navigation?: any;
  route?: any;
};

export function Products({
  navigation,
  route,
}: ProductsComponentProps): any {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<IStore[]>([]); //Receberá lista filtrada
  const [masterData, setMasterData] = useState<IStore[]>([]); //Lista a ser renderizada
  const [text, setText] = useState(''); //Controla value do input
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState();

  const perPage = 20;

  const getProducts = useCallback(
    async (page?: number) => {
      const {
        data: { data },
      } = await api.get(
        `api/lojas/v1/products/filters?loja=${user.id}${
          page ? '&page=' + page : ''
        }&size=${perPage}`
      );

      const { content, totalPages: total } = data;

      setFilteredData((prev) => {
        return [...prev, ...content];
      });
      setMasterData((prev) => {
        return [...prev, ...content];
      });

      !totalPages && setTotalPages(total);

      setPage((prev) => prev + 1);

      setIsLoading(false);
    },
    [totalPages]
  );

  const searchFilter = (text: string) => {
    if (text) {
      const newData = masterData.filter((item: any) => {
        if (item.name) {
          const itemData = item.name.toUpperCase();
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

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      setPage(1);
      setFilteredData([]);
      setMasterData([]);
      setIsLoading(true);
      getProducts();
    });

    return listener;
  }, [navigation]);

  useEffect(() => {
    getProducts();
  }, []);

  const onEndReachedHandler = useCallback(() => {
    if (isLoading || !page || !totalPages) return;
    setIsLoading(true);
    totalPages - page > 0
      ? getProducts(totalPages - page)
      : setIsLoading(false);
  }, [isLoading, page, totalPages]);

  return (
    <ProductsWrapper>
      <ProductsHeader>
        <ProductsTitle>Meus Produtos</ProductsTitle>

        <ProductsNewBtn
          onPress={() => navigation.navigate('NewProduct')}
        >
          <Icon name="plus" />
          <ProductsNewBtnText>Adicionar Produto</ProductsNewBtnText>
        </ProductsNewBtn>
      </ProductsHeader>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          paddingHorizontal: 8,
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <AntDesign name="search1" size={20} />
        <TextInput
          value={text}
          onChangeText={(t) => searchFilter(t)}
          placeholder="Pesquisar produtos?"
          style={{
            width: '90%',
            fontSize: 16,
            color: 'black',
            paddingHorizontal: 8,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        />
      </View>
      <ProductList
        products={filteredData as any}
        route={route as IRoute}
        isLoading={isLoading}
        hideFavoriteIcon={false}
        store={true}
        onEndReached={onEndReachedHandler}
      />
    </ProductsWrapper>
  );
}
