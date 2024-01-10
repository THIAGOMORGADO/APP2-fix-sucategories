import React from 'react';
import { ScrollView } from 'react-native';
import { paragraphs } from '../../../constants/StaticTexts';
import { Paragraph, Container, TextView } from './styles';

export const Entregas: React.FC = () => {
  return (
    <ScrollView>
      <Container>
        <TextView>
          {paragraphs.entrega.map((txt, index) => (
            <Paragraph key={index} bold={index === 0}>
              {`\t${txt}`}
            </Paragraph>
          ))}
        </TextView>
      </Container>
    </ScrollView>
  );
};
