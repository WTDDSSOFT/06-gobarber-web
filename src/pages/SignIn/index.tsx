import React, { useRef, useCallback } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import GetvalidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

/** Data of singIn */
interface SingInFormData {
  /** aqui sãos os dados que recebemos quando o user faz login */
  email: string;
  password: string;
}
const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const HandleSubmit = useCallback(
    async (data: SingInFormData) => {
      /* function Validation */
      try {
        /** zera os erros */
        formRef.current?.setErrors({});

        /** schema de validação - criamos quando vamos valida uum objeto inteiro */
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Required E-mail ')
            .email('Digite seu E-mail'),
          password: Yup.string().required('Required Password'),
        });
        await schema.validate(data, {
          abortEarly: false, // retorna todos os erros juntos.
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = GetvalidationErros(err);

          formRef.current?.setErrors(erros);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifice suas credencias',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SingIn;
