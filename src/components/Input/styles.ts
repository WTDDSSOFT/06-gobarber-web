import styled, { css } from 'styled-components';

import Tooltips from '../tooltips';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /**add another css on button */
  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f3ede8;

    &::placeholder {
      color: #666360;
    }

    & + input {
      margin-top: 8px;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltips)`
  height: 20px;
  margin-left: 16px; /*faz o input não econsta no icon */
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #ffff;

    &::before {
      border-color: #c53030;
    }
  }
`;
