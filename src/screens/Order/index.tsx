import React from 'react';
import { Platform } from 'react-native';

import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';

import {
  Container,
  Header,
  Photo,
  Sizes
} from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack
          onPress={() => {}}
          style={{ marginBottom: 108 }}
        />
      </Header>
      <Photo source={{ uri: 'https://github.com/George-b1t.png' }} />
      <Sizes>
        <RadioButton
          title='P'
          selected={false}
        />
        <RadioButton
          title='M'
          selected={false}
        />
        <RadioButton
          title='G'
          selected={false}
        />
      </Sizes>
    </Container>
  );
};