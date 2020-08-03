import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}
const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};
const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  /** colocando time no taost , para sumi sozinho  in 3 seconds */
  useEffect(() => {
    const time = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    /**
     * se eu retono qualquer função dentro do useEffect
     * ela e automaticamente execultad se o meu component deixa
     * de existir
     */
    return () => {
      clearTimeout(time);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      style={style}
      hasDescription={!!message.description}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {/* verifica se tem alguma description if has show */}
        {message.description && <p>{message.description}</p>}
      </div>
      <button
        onClick={() => {
          removeToast(message.id);
        }}
        type="button"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
