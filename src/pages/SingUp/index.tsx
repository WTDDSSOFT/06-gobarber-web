import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import GetvalidationErros from '../../utils/getValidationErros';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

const SingUp: React.FC = () => {
  /**
   * Lecture  Form validation
   *  Libery Yup- validation
   *     - podemos importa validação por validação.
   * Install.
   *
   * yarn add yup
   *  yarn add @types/yup -D
   *
   *  */
  const formRef = useRef<FormHandles>(null);

  const HandleSubmit = useCallback(async (data: object) => {
    /* function Validation */
    try {
      /** zera os erros */
      formRef.current?.setErrors({});

      /** schema de validação - criamos quando vamos falida uum objeto inteiro */
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite seu E-mail'),
        password: Yup.string().min(6, 'No mínmo 6 digitos'),
      });
      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros juntos.
      });
    } catch (err) {
      const erros = GetvalidationErros(err);

      formRef.current?.setErrors(erros);
    }
  }, []);
  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          {/* note , verifica o codigo da cada arquivo com calma */}
          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
