import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => (
  <Router>
    {/* Componentes que tem acesso ao context de auth. */}
    <AppProvider>
      {/* all components here has acess to all auth */}
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
