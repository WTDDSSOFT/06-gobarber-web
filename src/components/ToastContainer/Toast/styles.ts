import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}
const ToastTypeVariations = {
  info: css`
    background: #effffa;
    color: #2e656a;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};
/** quando usa o react-spring não podemos ultiliza
 * elementos da DOM mais sim os do spring.
 * funciona muito bem quando queremos controla um elemento antes de ir para tela
 *
 */
export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  & + div {
    margin-top: 8px;
  }
  background: #ebf8ff;
  color: #3172b7;

  ${props => ToastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1; /**ocupa o maximo do tamanho  */

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px; /**distancia um pouco o testo */
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 15px;
    opacity: 0.8;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
