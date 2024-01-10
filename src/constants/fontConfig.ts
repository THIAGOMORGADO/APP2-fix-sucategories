import { type Fonts } from 'react-native-paper/src/types';

export interface FontsConfigProps {
  web?: Fonts;
  ios?: Fonts;
  android?: Fonts;
}

export const fontConfig = (fonts: Fonts): FontsConfigProps => {
  return {
    web: fonts,
    ios: fonts,
    android: fonts,
  };
};
