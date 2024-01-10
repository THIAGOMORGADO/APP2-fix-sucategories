import React, {
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import {
  type CategoryType,
  type IStore,
  type IStores,
  type IProduct,
} from '../../../@types';
import { ButtonMoreContainer, StoresWrapper } from './styles';
import {
  LogBox,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { api } from '../../../config/api';
import { errorHandler } from '../../../utils/errorInstance';
import { colors } from '../../../constants/colors';
import { Day, Weeknd, Today } from '../../../utils/formatDate';

import { COLORS, FONTS, SIZES, dummyData } from '../../../constants';
import { HorizontalFoodCard } from '../../../components';
import CategoryItemCard from '../../../components/CategoryItemCard';
import StoryCard from '../../../components/storyCard';
import { Button } from '../../../components/Button';

const Section = ({
  title,
  children,
}: PropsWithChildren<{ title: string}>): ReactNode => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            flex: 1,
            color: colors.default.green,
            ...FONTS.h2,
          }}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

export const Categories: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [selectedMenuType, setSelectedMenutype] = React.useState(1);
  const [selectedMenu, setSelectedMenu] = React.useState(1);

  const [product, setProduct] = useState<IProduct[]>([]);
  const [productFilter, setProductFilter] = useState<IProduct[]>([]);
  const [storeList, setStoreList] = useState<IStore[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>(
    []
  );
  LogBox.ignoreAllLogs();

  const getStores = useCallback(async () => {
    try {
      const response = await api.get('api/lojas/v1');
      const stores: IStores = response.data.data;
      setStoreList(stores.content);
    } catch (error) {
      // Certifique-se de que errorHandler manipula adequadamente o erro
      errorHandler(error, 'api/lojas/v1', () => {});
    }
  }, [api, setStoreList, errorHandler]);

  const getCategory = async (): Promise<void>  => {
    try {
      const response = await api.get('api/category/v1/all-product');
      const categories: CategoryType[] = response.data.data;

      setCategoryList(categories);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      errorHandler(e, 'api/category/v1/', () => {});
    }
  };

  const getProduct = async (): Promise<void> => {
    try {
      const res = await api.get(`api/lojas/v1/products/filters`);

      const products: IProduct[] = res.data.data.content;

      setProduct(products);
    } catch (error) {
      console.log('erro ao carregar os produtos', error);
    }
  };

  const getProductFilter = async (start: string, end: string): Promise<void>  => {
    try {
      const res = await api.get(
        `api/lojas/v1/products/filters?startDate=${end}&endDate=${start}`
      );

      const productFilter: IProduct[] = res.data.data.content;
      setProductFilter(productFilter);
    } catch (error) {
      console.log('erro ao carregar os produtos', error);
    }
  };

  useEffect(() => {
    (() => {
      void getStores();
      void getCategory();
      void getProduct();
    })();
  }, []);

  useEffect(() => {
    (() => {
      if (selectedMenu === 1) {
        void getProductFilter(Today(), Day());
      } else {
        void getProductFilter(Today(), Weeknd());
      }
    })();
  }, [selectedMenu]);

  const recommend = [];

  function renderMenuTypes(): JSX.Element {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index === dummyData.menu.length - 1
                    ? SIZES.padding
                    : 0,
              }}
              onPress={() => {
                setSelectedMenutype(item.id);
                setSelectedMenu(item.id);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenuType === item.id
                      ? colors.default.green
                      : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderRecommendedSection(): JSX.Element {
    return (
      <Section
        title="Destaque"
      >
        <FlatList
          data={product}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginRight:
                    index === product.length - 1 ? SIZES.padding : 0,
                }}
                key={index}
              >
                <HorizontalFoodCard
                  containerStyle={{
                    height: 180,
                    width: SIZES.width * 0.85,
                    marginLeft: index === 0 ? SIZES.padding : 18,
                    marginRight:
                      index === recommend.length - 1
                        ? SIZES.padding
                        : 0,
                    paddingRight: SIZES.radius,
                    alignItems: 'center',
                  }}
                  imageStyle={{
                    marginTop: 1,
                    height: '100%',
                    width: 150,
                  }}
                  item={item}
                  onPress={() => navigation.navigate('Product', item)}
                />
              </View>
            );
          }}
        />
      </Section>
    );
  }
  function renderPopularSection(): JSX.Element {
    return (
      <Section title="Lojas">
        <FlatList
          data={storeList as any}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: 18,
          }}
          renderItem={({ item, index }) => {
            const isLast = index === storeList.length - 1;
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <StoryCard
                  key={index}
                  source={{
                    uri: item.avatar,
                  }}
                  style={{
                    marginRight: isLast ? 40 : 20,
                  }}
                  id={item.id}
                  name={item.fullName}
                  isFavourite={item.isFavourite}
                  onPress={() => {
                    navigation.navigate('Products', {
                      category: '',
                      id: item.id,
                      store: true,
                    });
                  }}
                />
                {isLast ? (
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ButtonMoreContainer>
                      <Button
                      backgroundColor='#2bc17e'
                        isMore
                        onPress={() =>
                          navigation.navigate('Shops', {
                            id: 0,
                            store: false,
                          })
                        }
                      />
                    </ButtonMoreContainer>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </Section>
    );
  }

  function renderFoodCategories(): JSX.Element {
    return (
      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 18,
        }}
        renderItem={({ item, index }) => {
          const isLast = index === categoryList.length - 1;

          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <CategoryItemCard
                key={index}
                name={item.name}
                source={{
                  uri: item.pictures[0],
                }}
                style={{
                  marginRight: 20,
                }}
                onPress={() => {
                  navigation.navigate('Products', {
                    category: item.name,
                    id: item.id,
                    store: false,
                  });
                }}
              />
              {isLast ? (
                <ButtonMoreContainer>
                  <Button
                    isMore
                    onPress={() => navigation.navigate('Category')}
                  />
                </ButtonMoreContainer>
              ) : null}
            </View>
          );
        }}
      />
    );
  }

  function renderDeliveryTo(): JSX.Element {
    return (
      <View>
        <Section
          title="Categorias"
        ></Section>
      </View>
    );
  }
  return (
    <StoresWrapper>
      <FlatList
        data={productFilter}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderDeliveryTo()}
            {renderFoodCategories()}
            {renderPopularSection()}
            {renderRecommendedSection()}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => navigation.navigate('Product', item)}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </StoresWrapper>
  );
};

export default Categories;
