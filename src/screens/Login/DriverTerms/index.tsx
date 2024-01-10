import React from 'react';
import { ScrollView } from 'react-native';
import * as Cellular from 'expo-cellular';

import { paragraphs } from '../../../constants/StaticTexts';

import { Paragraph, Container, TextView } from './styles';

type ICountryList = 'br' | 'ao' | null;

export const DriverTerms: React.FC = () => {
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
            ? paragraphs.driverTerms[countrySelected].map((arr) =>
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
