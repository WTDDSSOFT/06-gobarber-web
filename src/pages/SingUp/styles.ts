import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import singUpBackground from '../../assets/signUpbackground.png';

export const Container = styled.div`
  height: 100vh; /*pega o todal da altura do user*/

  display: flex;
  align-items: stretch; /** items tem o tamanho total da pagina*/
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; /**new tag */

  width: 100%;
  max-width: 700px;
`;

const apperFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(50px);
}
  to{
    opacity:1;
    transform: translateX(0)
  }

`;
/** add some animation in  from */
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; /**new tag */

  animation: ${apperFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f3ede8;
      display: block;
      margin-top: 23px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f3ede8')};
      }
    }
  }
  /** estiliza as ancoras que estõa no content , não pega as que estão dentro
  do nivel */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 23px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;

  background: url(${singUpBackground}) no-repeat center;
  background-size: cover;
`;
