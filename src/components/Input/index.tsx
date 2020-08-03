import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputPorps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}
const Input: React.FC<InputPorps> = ({ name, icon: Icon, ...rest }) => {
  /** refeence of element with input, acess DOM Element */
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setisFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  const HandlerInputFocus = useCallback(() => {
    setisFocused(true);
  }, []);
  const HandleInputBlur = useCallback(() => {
    setisFocused(false);

    /** if but convert value in boolean */
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    /** Registrer of inputs */
    registerField({
      name: fieldName /** filed name */,
      ref: inputRef.current /** reference of input */,
      path:
        'value' /** where they will go get input value , search in variable path */,
    });
  }, [fieldName, registerField]); /** what i used */

  return (
    /* check if icon exist */
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={HandlerInputFocus}
        onBlur={HandleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
