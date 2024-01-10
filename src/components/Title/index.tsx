import React from 'react';
import { ViewTitle, TitleTag } from './styles';

interface TitleProps {
  fontWeight?: 400 | 700;
  fontSize?: string;
  children?: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({
  children,
  ...rest
}) => {
  return (
    <ViewTitle>
      <TitleTag {...rest}>{children}</TitleTag>
    </ViewTitle>
  );
};
