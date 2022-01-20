import { Container } from './styles';
import { Platform } from 'react-native';

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : undefined}>

    </Container>
  );
};