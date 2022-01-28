import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';

import happyEmoji from '@assets/happy.png';
import { Search } from '@components/Search';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

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
      <Search onSearch={() => {}} onClear={() => {}} />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>
    </Container>
  );
};
