import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';
import { Container } from './styles';

interface LoaderProps {
  isLoading?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <Container>
      {isLoading && (
        <ActivityIndicator size="large" color={colors.default.gray} />
      )}
    </Container>
  );
};
