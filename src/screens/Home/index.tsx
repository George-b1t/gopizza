import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import happyEmoji from '@assets/happy.png';
import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton
} from './styles';

export function Home() {
  const isFocused = useIsFocused();

  const [ pizzas, setPizzas ] = useState<ProductProps[]>([]);
  const [ search, setSearch ] = useState("");

  const [ isSearching, setIsSearching ] = useState(false);

  const navigation = useNavigation();

  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    setIsSearching(true);

    firestore()
    .collection('pizzas')
    .orderBy('name_insensitive')
    .startAt(formattedValue)
    .endAt(`${formattedValue}\uf8ff`)
    .get()
    .then(response => {
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[];

      setPizzas(data);
    })
    .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta.'))
    .finally(() => setIsSearching(false));
  };

  function handleSearch() {
    fetchPizzas(search);
  };

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  };

  function handleOpen(id: string) {
    navigation.navigate('product', { id });
  };

  function handleAdd() {
    navigation.navigate('product', {});
  };

  useEffect(() => {
    fetchPizzas('');
  }, [isFocused]);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      
      <Search
        isLoading={isSearching}
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          marginHorizontal: 24
        }}
      />

      <NewProductButton
        title='Criar'
        type='secondary'
        onPress={handleAdd}
      />
    </Container>
  );
};
