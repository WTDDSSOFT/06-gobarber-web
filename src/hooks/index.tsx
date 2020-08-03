import React from 'react';

/** center import from hooks  */
import { AuthProvider } from './auth';
import { ToasProvaider } from './toast';

//* global provaider */
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToasProvaider>{children}</ToasProvaider>
  </AuthProvider>
);

export default AppProvider;
