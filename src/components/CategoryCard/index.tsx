import React from 'react';
import { Text } from 'react-native';
import { Container, IconWrapper, Icon, Title } from './styles';

interface ICategoryCard {
  title: string;
  icon: string;
}

export const CategoryCard: React.FC<ICategoryCard> = ({
  title,
  icon,
}) => {
  return (
    <Container>
      <IconWrapper>
        <Icon name={'image'} />
      </IconWrapper>
      <Title>{title}</Title>
    </Container>
  );
};
