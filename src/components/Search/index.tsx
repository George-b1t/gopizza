import React from 'react';
import { ActivityIndicator, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  Button,
  ButtonClear,
  Input,
  InputArea,
  Load
} from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
  isLoading: boolean;
};

export function Search({ onClear, onSearch, isLoading, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder='pesquisar...' { ...rest } />
        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} />
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        {
          isLoading ? (
            <Load />
          ) : (
            <Feather name='search' size={16} color={COLORS.TITLE} />
          )
        }
      </Button>
    </Container>
  );
};