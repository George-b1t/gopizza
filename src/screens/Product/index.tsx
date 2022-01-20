import { Container, DeleteLabel, Header, Title } from './styles';
import { Platform, TouchableOpacity } from 'react-native';

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : undefined}>

      <Header>
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>

      </Header>
      
    </Container>
  );
};