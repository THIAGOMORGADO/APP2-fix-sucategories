/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { type KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { api } from '../config/api';
import { type CartItem, type Cart } from '../@types/products';
import { type User } from '../@types/user';
import { registerForPushNotificationsAsync } from '../config/notifications';
import { errorHandler } from '../utils/errorInstance';
import { useReduxDispatch } from '../state/store';
import { authenticated } from '../state/reducers/authSlice';

interface ISignInCredential {
  email: string;
  password: string;
}

interface CartType {
  items: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clean: () => Promise<void>;
}

interface IAuthContextData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User;
  loading: boolean;
  signIn: (Credential: ISignInCredential) => Promise<void>;
  signOut: (id: number) => void;
  updateUser: (user: User) => Promise<void>;
  setLoading: (value: any) => void;
  token: string | undefined;
  cart: CartType | undefined;
  favorites: {
    handleFavorites: (id: number) => Promise<void>;
    getFavorites: () => Promise<number[]>;
  };
  handleTokenNotifications: {
    savedToken: () => Promise<string | null | undefined>;
    getNewToken: (
      id?: number | undefined
    ) => Promise<string | undefined>;
    saveToken: (token: string | undefined) => Promise<void>;
    setTokenToAPI: (
      id: number,
      token: string | undefined
    ) => Promise<boolean>;
    resolveToken: (id: number) => Promise<void>;
  };
}

interface IAuthState {
  token: string | undefined;
  user: User;
  cart: Cart;
  taxaEntrega: number | undefined;
  paymentCode: string | undefined;
}

interface IUser extends User {
  id: number;
}

const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

interface AuthProvider {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [data, setData] = useState<IAuthState>({
    token: undefined,
    user: {} as User,
    cart: [] as Cart,
    taxaEntrega: undefined,
    paymentCode: undefined,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useReduxDispatch();

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);

    const response = await api.post('auth', {
      email,
      password,
    });
    const { token, user } = response.data.data;

    const cart: Cart = [];
    const taxaEntrega = 0;
    const paymentCode = '';
    const userInfo: IUser = { ...user, intro: true };
    const tokenNotification =
      await handleTokenNotifications.getNewToken(userInfo.perfil);
    handleTokenNotifications.setTokenToAPI(
      user.id,
      tokenNotification || ''
    );
    await AsyncStorage.multiSet([
      ['@fieldRight:token', token],
      ['@fieldRight:user', JSON.stringify(userInfo)],
      ['@fieldRight:cart', JSON.stringify(cart)],
      ['@fieldRight:favorites', JSON.stringify([])],
      ['@fieldRight:taxaEntrega', JSON.stringify('')],
      ['@fieldRight:paymentCode', JSON.stringify('')],
      ['@fieldRight:tokenNotification', tokenNotification || ''],
    ]);

    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    await handleTokenNotifications.resolveToken(
      userInfo.id,
      userInfo.perfil
    );

    dispatch(
      authenticated({
        authenticated: true,
        authorized: true,
        token,
        error: false,
      })
    );
    setData({ token, user, cart, taxaEntrega, paymentCode });
    setLoading(false);
  }, []);

  const handleTokenNotifications = {
    resolveToken: async (id: number, perfil: string) => {
      const token =
        (await handleTokenNotifications.savedToken()) ||
        (await handleTokenNotifications.getNewToken(perfil));
      handleTokenNotifications.saveToken(token);
      handleTokenNotifications.setTokenToAPI(id, token);
    },

    savedToken: async () => {
      try {
        const token =
          (await AsyncStorage.getItem(
            '@fieldRight:tokenNotification'
          )) || '';
        return token;
      } catch (e) {}
      return undefined;
    },

    getNewToken: async (perfil: string) =>
      await registerForPushNotificationsAsync(perfil),

    saveToken: async (token: string | undefined) => {
      if (token)
        await AsyncStorage.setItem(
          '@fieldRight:tokenNotification',
          token
        );
    },

    setTokenToAPI: async (id: number, token: string | undefined) => {
      if (
        token &&
        token !== '' &&
        token !== undefined &&
        token !== null
      ) {
        const url = encodeURI(
          `/api/user/v1/updateExponentPushToken?exponentPushToken=${token}&userId=${id}`
        );

        try {
          await api.put(url);
          return true;
        } catch (error) {
          errorHandler(error, 'setTokenToAPI', () => {
            // Alert.alert('Sem conexão com a internet.', 'Por favor, verifique a sua conexão com a internet');
          });
          return false;
        }
      } else {
        return true;
      }
    },
  };

  const signOut = useCallback(async (id: number | undefined) => {
    const authToken = await AsyncStorage.getItem('@fieldRight:token');

    if (authToken && id) {
      handleTokenNotifications.setTokenToAPI(id, '1');
      await AsyncStorage.multiRemove([
        '@fieldRight:token',
        '@fieldRight:user',
        '@fieldRight:cart',
        '@fieldRight:tokenNotification',
      ]);
      setData({} as IAuthState);
    }
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem(
        '@fieldRight:user',
        JSON.stringify(user)
      );

      setData({
        token: data.token,
        user,
        cart: data.cart,
        taxaEntrega: data.taxaEntrega,
        paymentCode: data.paymentCode,
      });
    },
    [data.token, data.cart, data.taxaEntrega, data.paymentCode]
  );

  async function restoreStoredUserData(): Promise<void> {
    const [token, user, cart, taxaEntrega, paymentCode] =
      await AsyncStorage.multiGet([
        '@fieldRight:token',
        '@fieldRight:user',
        '@fieldRight:cart',
        '@fieldRight:taxaEntrega',
        '@fieldRight:paymentCode',
      ]);
    if (
      token[1] &&
      user[1] &&
      cart[1] &&
      taxaEntrega[1] &&
      paymentCode[1]
    ) {
      api.defaults.headers.common = {
        Authorization: `Bearer ${token[1]}`,
      };

      setData({
        token: token[1],
        user: JSON.parse(user[1]),
        cart: JSON.parse(cart[1]),
        taxaEntrega: JSON.parse(taxaEntrega[1]),
        paymentCode: JSON.parse(paymentCode[1]),
      });
    }
    setLoading(false);
  }

  async function autoSignOut(token: KeyValuePair): Promise<boolean> {
    setLoading(true);
    if (token && token[1] && typeof token[1] !== 'object') {
      const resultAuthValidation = await api
        .get('auth/validate', {
          headers: {
            Authorization: token[1],
          },
        })
        .then(() => {
          setLoading(false);
          return true;
        })
        .catch((e) => {
          if (data.user && 'id' in data.user) signOut(data.user?.id);
          setLoading(false);
          return false;
        });
      setLoading(false);
      return resultAuthValidation;
    }
    setLoading(false);
    return true;
  }

  const cart = {
    items: data.cart,

    clean: async () => {
      await AsyncStorage.setItem(
        '@fieldRight:cart',
        JSON.stringify([])
      );
      setData({ ...data, cart: [] });
    },

    addToCart: async (item: CartItem) => {
      let allItems = data.cart;

      const verifyLoja = data.cart.find(
        (cartItem: CartItem) =>
          cartItem.vendedorId !== item.vendedorId
      );
      const itemIndex = data.cart.findIndex(
        (cartItem: CartItem) => cartItem.id === item.id
      );
      if (verifyLoja) {
        Alert.alert(
          'Atenção',
          'Não é possivel adicionar produtos de lojas diferentes no carrinho'
        );
      } else {
        if (itemIndex >= 0) {
          allItems[itemIndex] = item;
        } else {
          allItems = [...allItems, item];
        }
      }

      await AsyncStorage.setItem(
        '@fieldRight:cart',
        JSON.stringify(allItems)
      );
      setData({ ...data, cart: allItems });
    },
    removeFromCart: async (id: number) => {
      const allItems = data.cart.filter(
        (cartItem: CartItem) => cartItem.id !== id
      );

      await AsyncStorage.setItem(
        '@fieldRight:cart',
        JSON.stringify(allItems)
      );
      setData({ ...data, cart: allItems });
    },
  };

  const favorites = {
    getFavorites: async () => {
      const favoritesJSON = await AsyncStorage.getItem(
        '@fieldRight:favorites'
      );

      return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    },
    handleFavorites: async (id: number) => {
      const favoritesData = await favorites.getFavorites();

      if (favoritesData.some((key: number) => key === id)) {
        const filteredFavorites = favoritesData.filter(
          (key: number) => key !== id
        );
        await AsyncStorage.setItem(
          '@fieldRight:favorites',
          JSON.stringify(filteredFavorites)
        );
      } else {
        favoritesData.push(id);
        await AsyncStorage.setItem(
          '@fieldRight:favorites',
          JSON.stringify(favoritesData)
        );
      }
    },
  };

  useEffect(() => {
    (async function () {
      const [token] = await AsyncStorage.multiGet([
        '@fieldRight:token',
      ]);
      autoSignOut(token).then((isValidAuthentication) => {
        if (isValidAuthentication) restoreStoredUserData();
      });
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
        loading,
        setLoading,
        cart,
        favorites,
        token: data.token,
        handleTokenNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
