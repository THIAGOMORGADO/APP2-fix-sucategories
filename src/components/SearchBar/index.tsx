import React, { useState } from 'react';
import {
  Container,
  InputText,
  SearchIcon,
  InputWrapper,
  Btn,
  BtnTxt,
  IConBack,
  IconContainer,
  TxtBack,
} from './styles';

interface ISearchBar {
  handleSubmit: (name?: string) => void;
  handleCancel: () => void;
  categoryNav: boolean;
  setCategoryNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IHandlePress {
  setFocus: (bool: boolean) => void;
  setInputVal: (str: string) => void;
  handleCancel: () => void;
}

const handlePress = ({
  setFocus,
  setInputVal,
  handleCancel,
}: IHandlePress) => {
  setFocus(false);
  setInputVal('');
  handleCancel();
};

export default function SearchBar({
  handleSubmit,
  handleCancel,
  categoryNav,
  setCategoryNav,
}: ISearchBar): JSX.Element {
  const [focus, setFocus] = useState(false);
  const [inputVal, setInputVal] = useState('');

  return (
    <Container>
      {categoryNav ? (
        <IconContainer
          onPress={() => {
            setCategoryNav(false);
            handleCancel();
          }}
        >
          <IConBack name="arrow-left" />
          <TxtBack>Voltar</TxtBack>
        </IconContainer>
      ) : (
        <>
          <InputWrapper focus={focus}>
            <SearchIcon name="search" />
            <InputText
              keyboardType="web-search"
              returnKeyType="search"
              onSubmitEditing={(event) => {
                handleSubmit(event.nativeEvent.text);
              }}
              onChangeText={setInputVal}
              value={inputVal}
              onFocus={() => {
                setFocus(true);
              }}
            />
          </InputWrapper>
          {focus && (
            <Btn
              onPress={() => {
                handlePress({ setFocus, setInputVal, handleCancel });
              }}
            >
              <BtnTxt>Cancelar</BtnTxt>
            </Btn>
          )}
        </>
      )}
    </Container>
  );
}
