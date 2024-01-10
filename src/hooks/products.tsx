import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  type IProduct,
  type ResponseProductsProps,
} from '../@types/products';
import { serializeObjectToQueryParams } from '../helpers/serealize';
import { useAuth } from './auth';
import { api } from '../config/api';
import { IRoute } from '../@types';

export interface RequestProductProps {
  category?: string;
  loja: number;
  name?: string;
  size?: number;
  offset?: number;
  page?: number;
  paged?: boolean;
  'sort.sorted'?: string;
  'sort.unsorted'?: string;
  unpaged?: boolean;
}
export interface RequestProductProp {
  category?: string;
  name?: string;
  size?: number;
  offset?: number;
  page?: number;
  paged?: boolean;
  'sort.sorted'?: string;
  'sort.unsorted'?: string;
  unpaged?: boolean;
}

interface UseProductsApiReturnType {
  isLoading: boolean;
  isLastPage: boolean;
  requestError: null | any;
  totalPages: number;
  currentPage: number;
  favoritesList: number[];
  products: IProduct[];
  hasReachedTheFinalPage: () => boolean;
  getProducts: (
    isRefreshing?: boolean,
    isGettingMore?: boolean
  ) => void;
  onRefresh: () => void;
}

type RequestParamsType =
  | undefined
  | RequestProductProps
  | {
      loja: number;
      page: number;
      size: number;
      paged: boolean;
      name: string;
    };
type RequestParam =
  | undefined
  | RequestProductProp
  | {
      loja: number;
      page: number;
      size: number;
      paged: boolean;
      name: string;
    };

function useProductsAPI(
  storeId: number,
  startProductNumber = 24,
  category: string,
  store: boolean
): UseProductsApiReturnType {
  const { user, favorites } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [requestError, setRequestError] = useState(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [favoritesList, setFavoritesList] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productStore, setProductStore] = useState<IProduct[]>([]);

  const requestParams: RequestParam = {
    page: currentPage,
    size: startProductNumber,
    paged: true,
    category,
  };
  const requestParamStore: RequestParamsType = {
    loja: storeId,
    page: currentPage,
    size: startProductNumber,
    paged: true,
  };

  const hasReachedTheFinalPage = (): boolean => {
    return !!(
      isLastPage ||
      (currentPage >= totalPages && totalPages > 1)
    );
  };

  const onRefresh = () => {
    setCurrentPage(0);
    setIsLastPage(false);
    getProducts(true);
  };

  const getProducts = useCallback(
    (isRefreshing = false, isGettingMore = false) => {
      const nextPage = currentPage + 1;
      const currentRequestParam = {
        ...requestParams,
        page: isRefreshing
          ? 0
          : isGettingMore
            ? nextPage
            : currentPage,
      };
      const currentRequestParamStore = {
        ...requestParamStore,
        page: isRefreshing
          ? 0
          : isGettingMore
            ? nextPage
            : currentPage,
      };
      if (isGettingMore) setCurrentPage(nextPage);

      if (hasReachedTheFinalPage()) {
        setIsLoading(false);
        return;
      }

      (async () => {
        setIsLoading(true);

        const favoritesArr = await favorites.getFavorites();
        setFavoritesList(favoritesArr);

        try {
          if (!storeId) {
            throw new Error(
              'useProductsAPI: "storeId" parameter is not implemented'
            );
          }
          const requestedStoreProducts =
            await api.get<ResponseProductsProps>(
              `api/lojas/v1/products/filters?${serializeObjectToQueryParams(
                store ? currentRequestParamStore : currentRequestParam
              )}`
            );
          const returnedProductList =
            requestedStoreProducts.data.data.content;
          const { totalPages: productsTotalPages, last } =
            requestedStoreProducts.data.data;

          setIsLastPage(last);
          setTotalPages(productsTotalPages);

          if (!isRefreshing)
            setProducts((previewProductList) => [
              ...previewProductList,
              ...returnedProductList,
            ]);
          else setProducts(returnedProductList);
        } catch (e) {
          console.log(e);
          Alert.alert(
            'Erro',
            'Ocorreu um erro ao carregar a lista de produtos'
          );
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [
      currentPage,
      requestParams,
      hasReachedTheFinalPage,
      favorites,
      storeId,
    ]
  );

  return {
    isLoading,
    isLastPage,
    requestError,
    totalPages,
    currentPage,
    favoritesList,
    products,
    hasReachedTheFinalPage,
    getProducts,
    onRefresh,
  } as UseProductsApiReturnType;
}

export { useProductsAPI };
