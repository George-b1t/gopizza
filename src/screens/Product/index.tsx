import { Platform, TouchableOpacity } from 'react-native';
import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';

import {
  Container,
  DeleteLabel,
  Header,
  Title,
  PickImageButton,
  Upload
} from './styles';

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

      <Upload>
        <Photo uri='https://github.com/George-b1t.png' />
        <PickImageButton title='Carregar' type='secondary' />
      </Upload>

    </Container>
  );
};