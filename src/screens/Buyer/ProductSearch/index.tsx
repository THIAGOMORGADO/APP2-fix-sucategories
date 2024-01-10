import React, { useEffect, useState, useContext } from 'react';
import { TextInput } from 'react-native';
import { type IRoute } from '../../../@types';
import { ProductsWrapper } from './styles';
import { ProductList } from '../../../components/product/ProductList';
import { useProductsAPI } from '../../../hooks/products';
import Testimony from '../../../components/Testimony';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
export const ProductSearch: React.FC<{
  navigation: any;
  route: IRoute;
}> = ({ route }) => {
  const [search, setSearch] = useState('');
  const {
    isLoading,
    isLastPage,
    favoritesList,
    products,
    hasReachedTheFinalPage,
    getProducts,
    onRefresh,
  } = useProductsAPI(1, 64, search, true);

  const handleRequestMore = (): void => {
    if (!hasReachedTheFinalPage()) {
      getProducts(false, true);
    }
  };
  const navigation = useNavigation();

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitle: () => (
        <TextInput
          placeholderTextColor={'white'}
          value={search}
          onChangeText={setSearch}
          autoFocus={true}
          placeholder="O que esta procurando?"
          style={{
            width: '100%',
            height: 50,
            fontSize: 20,
            color: 'white',
          }}
        />
      ),
    });
  }, [search]);

  const [modalTitle, setModalTitle] = useState('');

  const { dispatch: userDispatch, state } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const handleFromClick = () => {
    setModalTitle('Onde está a sua viatura?');
    setModalVisible(false);
  };

  const handleModalClick = () => {};

  console.log('product');
  return (
    <ProductsWrapper>
      <ProductList
        products={products}
        favoritesList={favoritesList}
        route={route}
        isLoading={isLoading}
        isLastPage={isLastPage}
        hideFavoriteIcon={false}
        onRefresh={onRefresh}
        onEndReached={handleRequestMore}
      />
      <Testimony
        route={route}
        products={products}
        title={modalTitle}
        visible={modalVisible}
        visibleAction={setModalVisible}
        clickAction={handleModalClick}
      />
    </ProductsWrapper>
  );
};
