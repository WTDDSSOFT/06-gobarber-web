import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
/** context information we used in a lot place in app */
interface AuthState {
  token: string;
  user: object;
}
interface signInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  /** formato do context */

  user: object;
  /** */
  signIn(credentials: signInCredentials): Promise<void>;
  /** */
  signOut(): void;
}
/** força que object e um context, porem como void object  */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    // search for save data in localstorege
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within and AuthProvider');
  }

  return context;
}
export { AuthProvider, useAuth };
