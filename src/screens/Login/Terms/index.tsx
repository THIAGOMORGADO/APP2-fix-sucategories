// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { ScrollView } from 'react-native';
import * as Cellular from 'expo-cellular';

import { paragraphs } from '../../../constants/StaticTexts';

import { Paragraph, Container, TextView } from './styles';

type ICountryList = 'br' | 'ao' | string | null;

export const Terms: React.FC = () => {
  const { isoCountryCode } = Cellular;

  const countrySelected: ICountryList = ['br', 'ao'].some(
    (iso) => iso === isoCountryCode
  )
    ? isoCountryCode
    : 'br';

  return (
    <ScrollView>
      <Container>
        <TextView>
          {countrySelected
            ? paragraphs.terms[countrySelected].map((arr) =>
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
