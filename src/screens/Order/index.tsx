import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';

import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

import {
  Container,
  Header,
  Photo,
  Sizes,
  Form,
  FormRow,
  InputGroup,
  Label,
  Price,
  Title,
  ContentScroll
} from './styles';

export function Order() {
  const [ size, setSize ] = useState("");

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={() => {}}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Photo source={{ uri: 'https://github.com/George-b1t.png' }} />

        <Form>
          <Title>Nome da Pizza</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>
            {
              PIZZA_TYPES.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  selected={size === item.id}
                  onPress={() => setSize(item.id)}
                />
              ))
            }
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType='numeric' />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType='numeric' />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button title='Confirmar pedido' />
        </Form>
      </ContentScroll>
    </Container>
  );
};