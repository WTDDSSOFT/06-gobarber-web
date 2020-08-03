import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastConatainer from '../components/ToastContainer';
/** Data for toast message */
/** formato dos estados do toast  */
export interface ToastMessage {
  /** aqui são os tipos dos dados que serão mostrados nos toast */
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}
interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToasProvaider: React.FC = ({ children }) => {
  /**
   * [] -> array.
   * {}-> object formated
   */
  const [messages, setMessages] = useState<ToastMessage[]>([]); // array toast state

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      /** atualizando o state of the toast */
      /**  hacker
       *  função -> eu recebo o valor antigo e posso retorna um novo valor
       * */
      setMessages(state => [...state, toast]);
      // outra forma de passa os dados antigos e adiconar os novos
    },
    [],
  );
  /** Omit omite o dado que quermos  */
  const removeToast = useCallback((id: string) => {
    /** filtra e retona todas as messagens dentro do setMessages, no caso os id's */
    setMessages(state => state.filter(message => message.id !== id));
    /** retorna todas messagems, e os id's, menos a que eu informe */
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastConatainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvaider');
  }

  return context;
}

export { ToasProvaider, useToast };
