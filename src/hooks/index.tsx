import React, { PropsWithChildren } from 'react';
import { AuthProvider } from './auth';

const AppProvider = ({ children }: PropsWithChildren) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
