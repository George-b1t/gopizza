import { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { ProductNavigationProps } from '@src/@types/navigation';

import {
  Container,
  DeleteLabel,
  Header,
  Title,
  PickImageButton,
  Upload,
  Form,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters
} from './styles';

export function Product() {
  const [ image, setImage ] = useState("");
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priceSizeP, setPriceSizeP ] = useState("");
  const [ priceSizeM, setPriceSizeM ] = useState("");
  const [ priceSizeG, setPriceSizeG ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as ProductNavigationProps;

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if ( status === 'granted' ) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if ( !result.cancelled ) {
        setImage(result.uri);
      };
    };
  };

  async function handleAdd() {
    if ( !image ) {
      return Alert.alert('Cadastro', 'Informe a imagem da pizza.');
    };

    if ( !name.trim() ) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.');
    };
    
    if ( !description.trim() ) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.');
    };

    if ( !priceSizeP || !priceSizeM || !priceSizeG ) {
      return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.');
    };

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`)

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
    .collection('pizzas')
    .add({
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      },
      photo_url,
      photo_path: reference.fullPath
    })
    .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
    .catch(() => Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza'));

    setIsLoading(false);
  };

  function handleBack() {
    navigation.goBack();
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={handleBack} />

        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              onChangeText={setName}
              value={name}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size='P'
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />

            <InputPrice
              size='M'
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />

            <InputPrice
              size='G'
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
            
          </InputGroup>

          <Button
            title='Cadastrar pizza'
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>

      </ScrollView>
    </Container>
  );
};