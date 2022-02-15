import React from 'react';

import { OrderCard } from '@components/OrderCard';

import { Container, Header, Title } from './styles';
import { FlatList } from 'react-native-gesture-handler';

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={['1', '2', '3']}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <OrderCard  index={index} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};
