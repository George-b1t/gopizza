import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';

import { useAuth } from '@hooks/auth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import brandImg from '@assets/brand.png';

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPassordLabel,
  ForgotPasswordButton
} from './styles';
import { RectButton } from 'react-native-gesture-handler';

export function SignIn() {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const { signIn, isLogging } = useAuth();
  
  function handleSignIn() {
    signIn(email, password);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={
        Platform.OS === 'ios'
        ? 'padding' : undefined
      }>
        <Content>

          <Brand source={brandImg} />
          <Title>Login</Title>

          <Input
            placeholder='E-mail'
            type='secondary'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
          />
          <Input
            placeholder='Senha'
            type='secondary'
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPassordLabel>
              Esqueci minha senha
            </ForgotPassordLabel>
          </ForgotPasswordButton>

          <Button
            title='Entrar'
            type='secondary'
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};