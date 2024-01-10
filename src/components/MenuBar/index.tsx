// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Container, Wrapper } from './styles';
import { ModalMenu } from '../ModalMenu';

interface IMenuBar {
  navigation: any;
  signOut: any;
}

export const MenuBar: React.FC<IMenuBar> = ({
  navigation,
  signOut,
}) => {
  return (
    <Container>
      <Wrapper>
        <ModalMenu navigation={navigation} signOut={signOut} />
      </Wrapper>
    </Container>
  );
};
