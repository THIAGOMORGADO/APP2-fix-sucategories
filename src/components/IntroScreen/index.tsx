import React, { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import {
  Container,
  Title,
  LogoWraper,
  TextWraper,
  Description,
  ButtonWraper,
} from './styles';
import { Button } from '../Button';

interface IIntroScreen {
  screens: Array<{
    img: any;
    title: string;
    description: string;
  }>;
  btnFinish: () => void;
}

export const IntroScreen: React.FC<IIntroScreen> = ({
  screens,
  btnFinish,
}) => {
  const win = Dimensions.get('window');
  const buttonWrapperHeight = 92;
  const LogoWrapperHeight = win.width * 0.513333 + 40;
  const TextWrapperHeight =
    win.height - buttonWrapperHeight - LogoWrapperHeight - 45;
  const [currentScreen, setCorrentScreen] = useState(0);

  const handlePress = useCallback((index) => {
    setCorrentScreen(index);
  }, []);

  return (
    <Container>
      <LogoWraper height={LogoWrapperHeight}>
        {screens[currentScreen].img}
      </LogoWraper>
      <TextWraper height={TextWrapperHeight}>
        <Title>{screens[currentScreen].title}</Title>
        <Description>
          {screens[currentScreen].description}
        </Description>
      </TextWraper>
      <ButtonWraper>
        {currentScreen > 0 && (
          <Button
            backgroundColor="#2bc17e"
            onPress={() => {
              handlePress(currentScreen - 1);
            }}
            width={45}
          >
            Voltar
          </Button>
        )}
        {currentScreen < screens.length - 1 && (
          <Button
            backgroundColor="#2bc17e"
            onPress={() => {
              handlePress(currentScreen + 1);
            }}
            width={45}
            marginLeft={currentScreen === 0}
          >
            Próximo
          </Button>
        )}
        {currentScreen === screens.length - 1 && (
          <Button
            backgroundColor="#2bc17e"
            width={45}
            onPress={btnFinish}
            marginLeft={currentScreen === 0}
          >
            Finalizar
          </Button>
        )}
      </ButtonWraper>
    </Container>
  );
};
