import { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
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
  MaxCharacters,
  Load,
  LoadContainer
} from './styles';

import { ProductProps } from '@components/ProductCard';

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

type PizzaUpdate = Omit<ProductProps, "id"> | {
  photo_path?: string;
  photo_url?: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [ photoPath, setPhotoPath ] = useState("");
  const [ image, setImage ] = useState("");
  const [ cacheImage, setCacheImage ] = useState("");
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priceSizeP, setPriceSizeP ] = useState("");
  const [ priceSizeM, setPriceSizeM ] = useState("");
  const [ priceSizeG, setPriceSizeG ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSearching, setIsSearching ] = useState(false);

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
    .catch(() => Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza'))
    .finally(() => setIsLoading(false));
  };

  async function handleUpdate() {
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

    const dataWithowtImage = {
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      }
    };

    let data: PizzaUpdate = {
      ...dataWithowtImage
    };

    if ( image != cacheImage ) {
      const referenceToDelete = storage().ref(photoPath);
      await referenceToDelete.delete();

      const fileName = new Date().getTime();
      const reference = storage().ref(`/pizzas/${fileName}.png`);

      await reference.putFile(image);
      const photo_url = await reference.getDownloadURL();

      data = {
        ...dataWithowtImage,
        photo_url,
        photo_path: reference.fullPath
      };
    };

    firestore()
    .collection('pizzas')
    .doc(id)
    .update(data)
    .then(async () => {
      Alert.alert('Cadastro', 'Pizza atualizada com sucesso.');
      navigation.navigate('home');
    })
    .catch(() => Alert.alert('Cadastro', 'Não foi possível atualizar a pizza'))
    .finally(() => setIsLoading(false));
  };

  function handleGoBack() {
    navigation.goBack();
  };

  function putAllPizzaData(product: PizzaResponse) {
    setName(product.name);
    setImage(product.photo_url);
    setCacheImage(product.photo_url);
    setDescription(product.description);
    setPriceSizeP(product.prices_sizes.p);
    setPriceSizeM(product.prices_sizes.m);
    setPriceSizeG(product.prices_sizes.g);
    setPhotoPath(product.photo_path);
  };

  useEffect(() => {
    if ( id ) {
      setIsSearching(true);

      firestore()
      .collection('pizzas')
      .doc(id)
      .get()
      .then(response => {
        const product = response.data() as PizzaResponse;

        putAllPizzaData(product);
      })
      .finally(() => {
        setIsSearching(false);
      });
    };
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={handleGoBack} />

        <Title>Cadastrar</Title>

        {
          id ? (
            <TouchableOpacity>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 45 }} />
          )
        }
        
      </Header>

      {
        isSearching ? (
          <>
            <LoadContainer>
              <Load />
            </LoadContainer>
          </>
        ) : (
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
                  <MaxCharacters>{description.length} de 60 caracteres</MaxCharacters>
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
                title={id ? 'Atualizar pizza' : 'Cadastrar pizza'}
                isLoading={isLoading}
                onPress={id ? handleUpdate : handleAdd}
              />
              
            </Form>

          </ScrollView>
        )
      }
    </Container>
  );
};