import React from 'react';
import { ScrollView } from 'react-native';
import * as Cellular from 'expo-cellular';

import { paragraphs } from '../../../constants/StaticTexts';

import { Container, TextView, Paragraph } from './styles';

type ICountryList = 'br' | 'ao' | null;

export const Privacy: React.FC = () => {
  const { isoCountryCode } = Cellular;

  const countrySelected = (
    ['br', 'ao'].some((iso) => iso === isoCountryCode)
      ? isoCountryCode
      : 'br'
  ) as ICountryList;

  return (
    <ScrollView>
      <Container>
        <TextView>
          {countrySelected
            ? paragraphs.privacy[countrySelected].map((arr) =>
                arr.map((txt, index) => (
                  <Paragraph key={index} bold={index === 0}>
                    {`\t${txt}`}
                  </Paragraph>
                ))
              )
            : null}
        </TextView>
      </Container>
    </ScrollView>
  );
};
