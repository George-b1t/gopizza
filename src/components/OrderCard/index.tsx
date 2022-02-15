import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  StatusContainer,
  Container,
  Description,
  Image,
  Name,
  StatusLabel,
  StatusTypesProps
} from './styles';

type Props = TouchableOpacityProps & {
  index: number;
};

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://github.com/George-b1t.png' }} />

      <Name>4 Queijos</Name>

      <Description>
        Mesa 5 🞄 Qnt: 1
      </Description>

      <StatusContainer status="Preparando">
        <StatusLabel status="Preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
};
