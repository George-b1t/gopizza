import { Container, DeleteLabel, Header, Title } from './styles';
import { Platform, TouchableOpacity } from 'react-native';
import { ButtonBack } from '@components/ButtonBack';

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : undefined}>

      <Header>
        <ButtonBack />
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>

      </Header>

    </Container>
  );
};