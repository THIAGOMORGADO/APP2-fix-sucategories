import React, { useState, useEffect, useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Alert,
  View,
  Text,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { SelectList } from '../../../components/SelectList';
import { api } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import {
  ImagePicker,
  Miniature,
} from '../../../components/ImagePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { type IProduct } from '../../../@types';

import {
  Container,
  Form,
  ImgsListWrapper,
  ImgsContainer,
  ImgsText,
  ButtonWrapper,
  SubTitle,
  Input,
} from './styles';
import { colors } from '../../../constants/colors';
import { errorHandler } from '../../../utils/errorInstance';
import { type CategoryResponseType } from '../../../@types/category';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';
import DateInput from '../../../components/DateInput';

interface IResponse {
  data: string[];
}

interface ICategories {
  nome: string;
  id: number;
}

interface IUnits {
  nome: string;
  id: string;
}

interface IEditProduct {
  navigation: any;
  route: {
    params: IProduct;
  };
}

export const EditProduct: React.FC<IEditProduct> = ({
  navigation,
  route,
}) => {
  const data = route.params;
  const { user, updateUser, setLoading } = useAuth();
  const [categories, setCategories] = useState([] as ICategories[]);
  const [unidadesMedida, setUnidadesMedida] = useState(
    [] as IUnits[]
  );
  const [categoryValue, setCategoryValue] = useState(
    data.category || ''
  );
  const [unidadesMedidaValue, setUnidadesMedidaValue] = useState(
    data.unidadeMedida || ''
  );
  const [pictures, setPictures] = useState(data.pictures);
  const [image, setImage] = useState([] as string[]);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [hour, setHour] = useState(new Date(Date.now()));
  const [datePicker2, setDatePicker2] = useState(false);
  const [date2, setDate2] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [mode2, setMode2] = useState('date');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedDateTime2, setSelectedDateTime2] = useState('');
  const [modalState, setModalState] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
    messageType: MessageTypes;
    handleContinue: () => void;
    handleCancel: () => void;
  }>({
    title: '',
    description: '',
    messageType: MessageTypes.INFORMATION,
    isVisible: false,
    handleContinue: () => {},
    handleCancel: () => {},
  });

  const handlePrice = (props: any): boolean => {
    return !props
      ? false
      : !!props
          .toString()
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+/, '').length;
  };

  useEffect(() => {
    (async () => {
      try {
        const responseUn =
          await api.get<IResponse>('/api/unidade/v1');
        const response = await api.get<CategoryResponseType>(
          '/api/category/v1'
        );

        if (responseUn.data.data.length > 0) {
          setUnidadesMedida(
            responseUn.data.data.map((item) => ({
              nome: item,
              id: item.split(' - ')[0],
            }))
          );
        }
        if (response.data.data.content) {
          setCategories(
            response.data.data.content.map(({ name, id }) => ({
              nome: name,
              id,
            }))
          );
        }
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler(
          e,
          '/api/unidade/v1 || /api/category/v1',
          () => {}
        );
      }
    })();
  }, []);

  const {
    values,
    handleChange,
    handleBlur,
    submitForm,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      name: data.name || '',
      description: data.description || '',
      price: data.price ? (data.price * 100).toString() : '',
      quantityAvailable: data.quantityAvailable.toString() || '',
      min_stock: data.min_stock?.toString() || '',
      altura: data.altura ? data.altura.toString() : '',
      comprimento: data.comprimento
        ? data.comprimento.toString()
        : '',
      largura: data.largura ? data.largura.toString() : '',
      peso: data.peso ? (data.peso * 1000).toString() : '',
      tpPreparacaoDias: '',
      tpPreparacaoHoras: '',
      tpPreparacaoMinutos: '',
      metrica: data.metrica.toString(),
      unidadeMedida: data.unidadeMedida,
      id: data.id,
      categoriaId: data.categoriaId,
      /*percentageProduct: data.percentage || 0,
      promotionStartDate: '',
      promotionEndDate: '',*/
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo obrigatório'),
      description: Yup.string().required('Campo obrigatório'),
      price: Yup.string().test(
        'price',
        'Valor não pode ser 0',
        (props) => handlePrice(props)
      ),
      quantityAvailable: Yup.number().test(
        'quantity',
        'O Valor não pode ser 0',
        (props) => !!props
      ),
      min_stock: Yup.number().required('Campo obrigatório'),
      categoriaId: Yup.number().required('Campo obrigatório'),
      unidadeMedida: Yup.string().required('Campo obrigatório'),
      percentageProduct: Yup.number(),
      altura: Yup.number().test(
        'altura',
        'O Valor não pode ser 0',
        (props) =>
          props && props?.toString().length > 0 ? !!props : true
      ),
      comprimento: Yup.number().test(
        'comprimento',
        'O Valor não pode ser 0',
        (props) =>
          props && props?.toString().length > 0 ? !!props : true
      ),
      largura: Yup.number().test(
        'largura',
        'O Valor não pode ser 0',
        (props) =>
          props && props?.toString().length > 0 ? !!props : true
      ),
      peso: Yup.string().test(
        'largura',
        'O Valor não pode ser 0',
        (props) =>
          props && props?.toString().length > 0 ? !!props : true
      ),
      metrica: Yup.number().test(
        'largura',
        'O Valor não pode ser 0',
        (props) => !!props
      ),
      tpPreparacaoDias: Yup.number(),
      tpPreparacaoHoras: Yup.number(),
      tpPreparacaoMinutos: Yup.number(),
    }),
    onSubmit: async ({
      /*promotionStartDate,
      promotionEndDate,*/
      ...payload
    }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        const apiValues: any = {};

        for (const key in payload) {
          const value = payload[key as keyof typeof payload];

          if (!!value) {
            if (key !== 'price' && key !== 'peso')
              apiValues[key] = value;
            else
              apiValues[key] = (
                parseInt(value.toString().replace(/[^0-9]/g, '')) /
                1000
              ).toString();
          }
        }

        apiValues['vendedorId'] = data.vendedorId;
        apiValues['vendedorName'] = data.vendedorName;

        formData.append('data', JSON.stringify(apiValues));
        /*
         await api.post('api/promocaoProduct/v1/newPromotion', {
           productId: payload.id,
           percentage: parseInt(payload.percentageProduct.toString()),
           startDate: promotionStartDate
             .split('T')
             .join(' ')
             .substring(0, 19),
           endDate: promotionStartDate
             .split('T')
             .join(' ')
             .substring(0, 19),
         });
*/
        if (image.length === 0) {
          const { data: updatedProduct } = await api.put(
            '/api/products/v1/updateProduct',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          setModalState({
            ...modalState,
            title: 'Feito!',
            description: 'Produto alterado com sucesso.',
            isVisible: true,
            messageType: MessageTypes.SUCCESS,
            handleContinue: () => {
              const filteredProducts = user.products?.filter?.(
                (item) => item.id !== updatedProduct.id
              );

              if (filteredProducts)
                updateUser({
                  ...user,
                  products: [...filteredProducts, updatedProduct],
                });
              else updateUser({ ...user, products: updatedProduct });

              setModalState({ ...modalState, isVisible: false });
              navigation.goBack();
            },
          });
        } else {
          const file = image.map((item: string) => {
            return {
              uri: item,
              type: 'image/jpeg',
              name: 'imagename.jpg',
            };
          });

          formData.append('picture', file as any);

          const { data: updatedProduct } = await api.put(
            '/api/products/v1/updateProduct',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          setModalState({
            ...modalState,
            title: 'Feito!',
            description: 'Produto alterado com sucesso.',
            isVisible: true,
            messageType: MessageTypes.SUCCESS,
            handleContinue: () => {
              const filteredProducts = user.products?.filter?.(
                (item) => item.id !== updatedProduct.id
              );

              if (filteredProducts)
                updateUser({
                  ...user,
                  products: [...filteredProducts, updatedProduct],
                });
              else updateUser({ ...user, products: updatedProduct });

              setModalState({ ...modalState, isVisible: false });
              navigation.goBack();
            },
          });
        }
      } catch (e) {
        errorHandler(e, false, (message) => {
          setModalState({
            ...modalState,
            title: 'Algo deu errado',
            description: message as string,
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
            },
          });
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    if (!isValid) {
      setModalState({
        ...modalState,
        title: 'Oops.',
        description: 'Verifique os seus dados e tente novamente',
        isVisible: true,
        messageType: MessageTypes.FAIL,
        handleContinue: () => {
          setModalState({ ...modalState, isVisible: false });
        },
      });
    } else {
      submitForm();
    }
  }, []);

  const handleDelete = () => {
    Alert.alert(
      'Excluir produto?',
      'Tem certeza que quer excluir este produto? Esta ação é irreversível.',
      [
        {
          text: 'Sim, excluir',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await api.delete(
                `/api/products/v1/deleteProduct?productId=${data.id}`
              );

              const { data: products } = response.data;

              updateUser({ ...user, products });
              setLoading(false);
              navigation.goBack();
            } catch (e) {
              setModalState({
                ...modalState,
                title: 'Oops.',
                description: 'Não foi possível remover o produto.',
                isVisible: true,
                messageType: MessageTypes.FAIL,
                handleContinue: () => {
                  setModalState({ ...modalState, isVisible: false });
                },
              });
            }
            setLoading(false);
          },
        },
        {
          text: 'Cancelar',
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
              <Form>
                <SubTitle>Sobre o Produto</SubTitle>
                <TextInput
                  label="Qual o nome do seu produto?*"
                  errors={errors}
                  name="name"
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                />
                <SelectList
                  data={categories}
                  error={errors}
                  name="categoriaId"
                  handleChange={(selected: any) => {
                    setCategoryValue(selected.value);
                    values.categoriaId = selected.value;
                  }}
                  value={categoryValue}
                  label="Qual categoria o descreve melhor?*"
                />
                <TextInput
                  label="Descreva o seu produto*"
                  errors={errors}
                  name="description"
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                />
                <TextInput
                  label="Preço Unitário*"
                  errors={errors}
                  name="price"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  mode="outlined"
                  keyboardType="number-pad"
                  mask="currency"
                />
                <SelectList
                  data={unidadesMedida}
                  error={errors}
                  name="unidadeMedida"
                  handleChange={(selected: any) => {
                    setUnidadesMedidaValue(selected.value);
                    values.unidadeMedida = selected.value;
                  }}
                  value={unidadesMedidaValue}
                  label="Unidade de Medida*"
                />
                <TextInput
                  label="Medida (mm, cm ou dm)*"
                  errors={errors}
                  name="metrica"
                  placeholder="Valor da Unidade de Medida"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual a quantidade disponível?*"
                  errors={errors}
                  name="quantityAvailable"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual é o estoque mínimo?*"
                  errors={errors}
                  name="min_stock"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <SubTitle>Sobre a embalagem</SubTitle>
                <TextInput
                  label="Qual o peso?(kg)*"
                  errors={errors}
                  name="peso"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                  mask="weightInput"
                />
                <TextInput
                  label="Qual a altura?(cm)"
                  errors={errors}
                  name="altura"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual o comprimento?(cm)"
                  errors={errors}
                  name="comprimento"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual a largura?(cm)"
                  errors={errors}
                  name="largura"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                {/*} <SubTitle>Promoção do produto</SubTitle>
                <TextInput
                  label="Diga a percentagem?"
                  errors={errors}
                  name="percentageProduct"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />

                <DateInput
                  value={
                    values.promotionStartDate
                      ? new Date(values.promotionStartDate)
                      : undefined
                  }
                  label="Data de Início"
                  minimumDate={new Date()}
                  error={!!errors.promotionStartDate}
                  onChange={(date) => {
                    values.promotionStartDate = date;
                  }}
                />
                <DateInput
                  value={
                    values.promotionEndDate
                      ? new Date(values.promotionEndDate)
                      : undefined
                  }
                  label="Data de Final"
                  minimumDate={new Date()}
                  error={!!errors.promotionEndDate}
                  onChange={(date) => {
                    values.promotionEndDate = date;
                  }}
                />*/}

                <SubTitle>Foto</SubTitle>
                {!(pictures.length === 0) && (
                  <ImgsContainer scrollEnabled>
                    <ImgsListWrapper>
                      {pictures.map((item, index) => (
                        <Miniature
                          key={index}
                          uri={item}
                          icon="trash"
                          handleOnPress={async () => {
                            Alert.alert(
                              'Remover imagem',
                              'Tem certeza que deseja remover esta imagem? Esta ação é irreversível.',
                              [
                                {
                                  text: 'Sim, remover',
                                  onPress: async () => {
                                    try {
                                      const response =
                                        await api.delete(
                                          `api/products/v1/removePicture?pictureUrl=${item}&productId=${data.id}`
                                        );
                                      const updatedProduct =
                                        response.data.data;
                                      setPictures(
                                        updatedProduct.pictures
                                      );

                                      const filteredProducts =
                                        user?.products
                                          ? user.products.filter(
                                              (product) =>
                                                product.id !==
                                                updatedProduct.id
                                            )
                                          : [];

                                      updateUser({
                                        ...user,
                                        products: [
                                          ...filteredProducts,
                                          updatedProduct,
                                        ],
                                      });
                                    } catch (e) {
                                      setModalState({
                                        ...modalState,
                                        title: 'Oops.',
                                        description:
                                          'Não foi possível remover a imagem',
                                        isVisible: true,
                                        messageType:
                                          MessageTypes.FAIL,
                                        handleContinue: () => {
                                          setModalState({
                                            ...modalState,
                                            isVisible: false,
                                          });
                                        },
                                      });
                                    }
                                  },
                                },
                                {
                                  text: 'Cancelar',
                                },
                              ]
                            );
                          }}
                        />
                      ))}
                    </ImgsListWrapper>
                  </ImgsContainer>
                )}
                <ImagePicker image={image} setImage={setImage} />
                <ButtonWrapper>
                  <Button onPress={handleSubmit} width={45}>
                    Salvar
                  </Button>
                  <Button
                    onPress={handleDelete}
                    width={45}
                    backgroundColor={colors.default.red}
                  >
                    Excluir
                  </Button>
                </ButtonWrapper>
              </Form>
            </Container>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <MessageModal
        description={modalState.description}
        handleContinue={modalState.handleContinue}
        handleCancel={modalState.handleCancel}
        messageType={modalState.messageType}
        isVisible={modalState.isVisible}
        title={modalState.title}
      />
    </KeyboardAvoidingView>
  );
};
