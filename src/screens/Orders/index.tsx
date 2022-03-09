import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';

import { OrderCard, OrderProps } from '@components/OrderCard';
import { Container, Header, Title } from './styles';
import { ItemSeparator } from '@components/ItemSeparator';
import { Alert } from 'react-native';

export function Orders() {
  const [ orders, setOrders ] = useState<OrderProps[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        }) as OrderProps[];

        setOrders(data);
      });

      return () => subscribe();
  }, []);

  function handlePizzaDelivered(id: string, status: string) {
    Alert.alert('Pedido', `Atualizar status para: ${status === 'Pronto' ? 'Entregue' : 'Pronta'} ?`, [
      {
        text: 'Cacelar',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().
            collection('orders')
            .doc(id)
            .update({
              status: status === 'Pronto' ? 'Entregue' : 'Pronto'
            })
        }
      }
    ]);
  };

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id, item.status)}  
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
};
