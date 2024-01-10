import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { api } from '../../../config/api';
import { errorHandler } from '../../../utils/errorInstance';
import { type ResponseStoreProps } from '../../../@types';
import { NotFound } from '../../../components/NotFound/index';
import { colors } from '../../../constants/colors';
import { useAuth } from '../../../hooks/auth';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface ItemType {
  title: string;
  id: number;
}

type AllDriverSelectedStoresType = ItemType & {
  removeId: number;
};

export function ChooseStores(): JSX.Element {
  const { user } = useAuth();
  const selectRef = React.useRef(null);
  const [allStores, setAllStores] = React.useState<ItemType[]>([]);
  const [nonStoresFounded, setNoStoresFounded] =
    React.useState<boolean>(false);
  const [allDriverSelectedStores, setAllDriverSelectedStores] =
    React.useState<AllDriverSelectedStoresType[]>([]);
  const [selectedStores, setSelectedStores] = React.useState<
    number[]
  >([]);
  const [loadingStores, setLoadingStores] =
    React.useState<boolean>(false);
  const [modalState, setModalState] = React.useState<{
    title: string;
    description: string;
    isVisible: boolean;
    messageType: MessageTypes;
    handleContinue: () => void;
    handleCancel: () => void;
  }>({
    title: '',
    description: '',
    messageType: MessageTypes.INFORMATION,
    isVisible: false,
    handleContinue: () => {},
    handleCancel: () => {},
  });

  async function getAllStores(): Promise<void> {
    setLoadingStores(true);
    try {
      const { data: StoreData } =
        await api.get<ResponseStoreProps>('/api/lojas/v1');
      const responseStores = StoreData.data.content.map(
        ({ nomeLoja, id }) => ({
          title: nomeLoja,
          id,
        })
      );
      if (responseStores.length <= 0) setNoStoresFounded(true);
      setAllStores(responseStores);
    } catch (e) {
      errorHandler(
        e,
        '[Choose Stores(screen): /api/lojas/v1]',
        () => {
          return '';
        }
      );
    } finally {
      setLoadingStores(false);
    }
  }

  async function getAllChosenStoresByDriverId(
    driverId: number,
    enableLoading = false
  ): Promise<void> {
    if (enableLoading) setLoadingStores(true);
    try {
      const { data: categoryData } = await api.get(
        `/api/user-loja/v1/findAllByMotorista?motorista=${driverId}`
      );
      const responseStores = categoryData.map(
        ({ id, loja, nomeLoja }) => ({
          title: nomeLoja,
          id: loja,
          removeId: id,
        })
      );
      setAllDriverSelectedStores(responseStores);
    } catch (e) {
      errorHandler(
        e,
        '[/api/user-loja/v1/findAllByMotorista?motorista]',
        () => {
          return '';
        }
      );
    } finally {
      setLoadingStores(false);
    }
  }

  async function addChosenStore(
    storeId: number,
    DriverId: number
  ): Promise<void> {
    try {
      await api.post(`/api/user-loja/v1/choose-stores`, {
        loja: storeId,
        motorista: DriverId,
      });
      if (DriverId) await getAllChosenStoresByDriverId(DriverId);
    } catch (e) {
      errorHandler(e, '[/api/user-loja/v1/choose-stores]', () => {
        setModalState({
          ...modalState,
          title: 'Oops!',
          description:
            'Ocorreu um algum erro ao Selecionar a loja... Por favor, tente mais tarde.',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      });
    } finally {
      setLoadingStores(false);
    }
  }

  async function removeChosenStore(storeId: number): Promise<void> {
    try {
      await api.delete(`/api/user-loja/v1/delete?id=${storeId}`);
      if (user.id) await getAllChosenStoresByDriverId(user.id);
    } catch (e) {
      errorHandler(e, '[/api/user-loja/v1/delete?id]', () => {
        setModalState({
          ...modalState,
          title: 'Oops!',
          description:
            'Ocorreu um algum erro ao Excluir a loja... Por favor, tente mais tarde',
          isVisible: true,
          messageType: MessageTypes.FAIL,
          handleContinue: () => {
            setModalState({ ...modalState, isVisible: false });
          },
        });
      });
    } finally {
      setLoadingStores(false);
    }
  }

  React.useEffect(() => {
    if (selectedStores.length > 0) {
      selectedStores
        .filter(
          (store) =>
            !allDriverSelectedStores
              .map((selectedStore) => selectedStore.id)
              .includes(store)
        )
        .forEach((store) => {
          if (user.id) addChosenStore(store, user.id);
        });

      allStores
        .filter(
          (store) =>
            !selectedStores.includes(store.id) &&
            allDriverSelectedStores
              .map((selectedStore) => selectedStore.id)
              .includes(store.id)
        )
        .forEach((store) => {
          const IDStoreToExclude = allDriverSelectedStores.filter(
            (storeToDelete) => storeToDelete.id === store.id
          )[0].removeId;
          removeChosenStore(IDStoreToExclude);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStores]);

  React.useEffect(() => {
    if (allStores.length <= 0)
      setSelectedStores(
        allDriverSelectedStores.map((store) => store.id)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDriverSelectedStores]);

  React.useEffect(() => {
    setLoadingStores(true);
    if (user.id) getAllChosenStoresByDriverId(user.id, true);
    getAllStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loadingStores && allStores.length > 0 && !nonStoresFounded) {
    return (
      <View
        style={{
          paddingVertical: 18,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
        }}
      >
        <SectionedMultiSelect<ItemType>
          ref={selectRef}
          items={allStores}
          IconRenderer={Icon}
          uniqueKey="id"
          displayKey="title"
          selectText="Selecionar lojas para trabalhar..."
          confirmText="Confirmar Loja(s) Selecionadas"
          selectedText="selecionada(s)"
          showDropDowns
          onSelectedItemsChange={setSelectedStores}
          selectedItems={selectedStores}
          colors={{
            primary: colors.default.green,
          }}
          styles={{
            listContainer: {
              backgroundColor: '#ccc',
            },
            separator: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <MessageModal
          description={modalState.description}
          handleContinue={modalState.handleContinue}
          handleCancel={modalState.handleCancel}
          messageType={modalState.messageType}
          isVisible={modalState.isVisible}
          title={modalState.title}
        />
      </View>
    );
  }

  if (loadingStores && !nonStoresFounded && allStores.length === 0) {
    return <NotFound message="Carregando as Lojas..." />;
  }

  if (!nonStoresFounded) {
    return (
      <NotFound message="Carregando todas as Lojas Selecionadas..." />
    );
  }

  return (
    <NotFound message="Nenhuma Loja foi encontrada no Sistema!" />
  );
}
