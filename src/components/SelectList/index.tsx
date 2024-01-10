import React, { useState, type ReactNode, useEffect } from 'react';
import { type ListRenderItemInfo, Modal, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

import {
  Container,
  ModalContainer,
  ListContainer,
  ListItemContainer,
  ListItem,
  Button,
  ButtonText,
  SelectListContainer,
  SelectListText,
  TxtLabel,
  Error,
} from './styles';

interface SelectList {
  name: string;
  data: any;
  label: string;
  value: any;
  error: any;
  handleChange: any;
  children?: ReactNode;
}

interface GetItemLayoutReturnType {
  length: number;
  offset: number;
  index: number;
}

const ITEM_HEIGHT = 121;

export function SelectList({
  name,
  data,
  label,
  value,
  handleChange,
  error,
}: SelectList): React.ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('Selecione');

  function handleChangeOption(item: { id?: number }): void {
    handleChange({ name, value: item?.id });
    setModalVisible(!modalVisible);
  }

  const getItemLayout = (
    dataList: [],
    index: number
  ): GetItemLayoutReturnType => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * dataList.length,
      index,
    };
  };

  const handleKeyExtractor = (item: any): any => item.id;

  const handleRenderItems = ({
    item,
  }: ListRenderItemInfo<any>): JSX.Element => (
    <ListItemContainer
      onPress={() => {
        handleChangeOption(item);
      }}
    >
      <ListItem>{item?.nome}</ListItem>
    </ListItemContainer>
  );

  useEffect(() => {
    const [foundName] = data.filter((item: any) => item.id === value);

    if (foundName) setSelected(foundName.nome);
    else setSelected('Selecione...');
  }, [data, value]);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <Text>Selecione um item abaixo:</Text>
          <ListContainer
            initialNumToRender={30}
            data={data.filter((item: any) =>
              item.nome
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                  search
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                )
            )}
            // getItemLayout={getItemLayout}
            keyExtractor={handleKeyExtractor}
            renderItem={handleRenderItems}
          />

          <Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>

      {label ? <TxtLabel>{label}</TxtLabel> : null}
      <SelectListContainer
        onPress={() => {
          setSearch('');
          setModalVisible(true);
        }}
      >
        <SelectListText>{selected}</SelectListText>
      </SelectListContainer>
      {error[name] ? (
        <Error>
          <HelperText type="error" visible={!!error[name]}>
            {error[name]}
          </HelperText>
        </Error>
      ) : null}
    </Container>
  );
}
