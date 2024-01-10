import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Dimensions, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { type IProduct } from '../../../@types';
import NumberFormat from '../../../utils/NumberFormat';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';
import { imgNotFound } from '../../../constants/imgNotFound';
import { type CartItem } from '../../../@types/products';
import { TextInput } from '../../../components/TextInput';
import { SelectList } from '../../../components/SelectList';
import {
  Container,
  Content,
  Img,
  WeightWrapper,
  Weight,
  Name,
  Price,
  Description,
  QtdWrapper,
  QtdBtn,
  Icon,
  QtdNum,
  QtdNumWrapper,
  Footer,
  ImgContainer,
} from './styles';
import { constants } from '../../../constants';
import { api } from '../../../config/api';
import { colors } from '../../../constants/colors';
import { type BuyerTabScreenProps } from '../../../types/navigation';
import axios from 'axios';
interface IBuyerProduct {
  navigation: BuyerTabScreenProps;
  route: {
    params: IProduct;
  };
}

export const BuyerProduct: React.FC<IBuyerProduct> = ({ route }) => {
  const { width: winWidth, height: winHeight } =
    Dimensions.get('window');
  const {
    pictures,
    name,
    metrica,
    unidadeMedida,
    price,
    vendedorId,
    country,
    quantityAvailable,
    id,
    enderecoLoja,
    description,
  } = route.params;
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [novoPreco, setNovoPreco] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const imgORnotFound =
    pictures.length > 0 ? { uri: pictures[0] } : imgNotFound;
  const [image, setImage] = useState(imgORnotFound);
  const [quantity, setQuantity] = useState(1);
  const [cidadeData, setCidadeData] = useState([]);
  const [ufValue, setUfValue] = useState('');
  const [cidadeValue, setCidadeValue] = useState('');
  const { cart } = useAuth();
  const navigate = useNavigation<BuyerTabScreenProps>();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const paisData = [
    { nome: 'Angola', id: 'AGO' },
    { nome: 'Brasil', id: 'BRA' },
    { nome: 'Portugal', id: 'POR' },
  ];
  useEffect(() => {
    getSize();
  }, [image, imgIndex]);

  const getSize = useCallback(async () => {
    try {
      await fetch(image.uri).then(async (response) => {
        if (response.status === 404) {
          setImage(imgNotFound);
          const ratio = winWidth / 584;
          setSize({
            width: winWidth,
            height: 387 * ratio,
          });
          return;
        }

        await Image.getSize(
          image.uri,
          (width: number, height: number) => {
            const ratio = winWidth / width;
            const imgHeight =
              height * ratio > winHeight * 0.3
                ? winHeight * 0.3
                : height * ratio;
            const imgWidth =
              height * ratio > winHeight * 0.3
                ? (imgHeight * width) / height
                : winWidth;
            setSize({
              width: imgWidth,
              height: imgHeight,
            });
          }
        );
      });
    } catch (e) {
      setImage(imgNotFound);
      const ratio = winWidth / 584;
      setSize({
        width: winWidth,
        height: 387 * ratio,
      });
    }
  }, []);

  const handleQtd = (qtd: number) => {
    if (qtd >= 1 && qtd <= quantityAvailable) setQuantity(qtd);
  };

  const handleAddToCart = async (
    data: CartItem,
    goCart?: boolean
  ): Promise<void> => {
    if (cart) await cart.addToCart(data);

    if (goCart) {
      navigate.navigate('Cart');
      return;
    }
    navigate.goBack();
  };
  const calculatePrice = (value: any, id: any) => {
    const data = {
      productId: id,
      unidadeMedida: 'g',
      quantity: value,
    };
    api
      .post('/api/compras/v1/fracaoPrice', data)
      .then((response) => {
        if (response) {
          response.data?.data?.novoPreco &&
            setNovoPreco(response.data?.data?.novoPreco);
        }
      })
      .catch((err) => {
        alert(err);
        console.error('ops! ocorreu um erro' + err);
      });
  };

  const handleChange = (value: any) => {
    setSelectedLanguage(value);
    calculatePrice(value, id);
  };

  return (
    <>
      <Container scrollEnabled>
        <ImgContainer>
          <Image
            style={{
              alignSelf: 'center',
              height: '100%',
              width: 300,
            }}
            source={image}
            resizeMode="center"
          />
        </ImgContainer>
        <Content>
          <Name>{name}</Name>
          <Description>{description}</Description>
          <Price>
            {'R$ ' + (novoPreco != 0 ? novoPreco : price)}
          </Price>

          <WeightWrapper>
            <Picker
              enabled={unidadeMedida == 'kg'}
              style={{ width: '100%' }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) => {
                handleChange(itemValue);
              }}
            >
              {constants.Fracao.map((value) => (
                <Picker.Item
                  label={value.label + ''}
                  value={value.value}
                />
              ))}
            </Picker>
            {/* <Weight>{metrica + unidadeMedida}</Weight> */}
          </WeightWrapper>
        </Content>
      </Container>
      <Footer>
        <QtdWrapper>
          <QtdBtn
            onPress={() => {
              handleQtd(quantity - 1);
            }}
          >
            <Icon
              name="minus"
              color={() =>
                quantity > 1
                  ? colors.default.green
                  : colors.default.gray
              }
            />
          </QtdBtn>

          <QtdNumWrapper>
            <QtdNum>{quantity}</QtdNum>
          </QtdNumWrapper>

          <QtdBtn
            onPress={() => {
              handleQtd(quantity + 1);
            }}
          >
            <Icon name="plus" color={colors.default.green} />
          </QtdBtn>
        </QtdWrapper>

        <Button
          upper
          backgroundColor="#2bc17e"
          width={60}
          onPress={async () => {
            await handleAddToCart({
              id,
              enderecoLoja,
              qtd: quantity,
              vendedorId,
              price,
              unidadeMedida,
            });
          }}
        >
          adicionar
        </Button>
      </Footer>
    </>
  );
};
