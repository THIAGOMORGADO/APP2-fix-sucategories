import React, { useState, useEffect, useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { SelectList } from '../../../components/SelectList';
import { api } from '../../../config/api';
import { useAuth } from '../../../hooks/auth';
import { ImagePicker } from '../../../components/ImagePicker';

import { Container, Form, SubTitle } from './styles';
import { type CategoryResponseType } from '../../../@types/category';
import { errorHandler } from '../../../utils/errorInstance';
import { Name } from '../../Buyer/Cart/styles';
import { MessageTypes } from '../../../components/Modals/type';
import { MessageModal } from '../../../components/Modals/MessageModal';

interface ResponseUnitType {
  data: string[];
}

interface ICategories {
  nome: string;
  id: string;
}
interface Categories {
  nome: string;
  id: number;
}
type UnitsType = ICategories;

export const NewProduct: React.FC = () => {
  const [categories, setCategories] = useState<Categories[] | []>([]);
  const [unidadesMedida, setUnidadesMedida] = useState<
    UnitsType[] | []
  >([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [unidadesMedidaValue, setUnidadesMedidaValue] = useState('');
  const navigation = useNavigation();
  const { user, updateUser, setLoading, token } = useAuth();
  const [image, setImage] = useState([] as string[]);
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

  const handlePrice = (props: string | undefined): boolean => {
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
        const { data: categoryData } =
          await api.get<CategoryResponseType>('/api/category/v1');
        setCategories(
          categoryData.data.content.map((category) => ({
            nome: category.name,
            id: category.id,
          }))
        );

        const { data: unitData } =
          await api.get<ResponseUnitType>('/api/unidade/v1');
        setUnidadesMedida(
          unitData.data.map((unit) => ({
            nome: unit,
            id: unit.split(' - ')[0].toLowerCase(),
          }))
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const {
    values,
    handleChange,
    submitForm,
    errors,
    isValid,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      quantityAvailable: '',
      categoriaId: '',
      altura: '',
      comprimento: '',
      largura: '',
      peso: '',
      metrica: '',
      unidadeMedida: '',
      min_stock: '',
      pesoCubado: '',
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
      categoriaId: Yup.string().required('Campo obrigatório'),
      unidadeMedida: Yup.string().required('Campo obrigatório'),
      min_stock: Yup.string().required('Campo obrigatório'),
      altura: Yup.number().test(
        'altura',
        'O Valor não pode ser 0',
        (props) => !!props
      ),
      comprimento: Yup.number().test(
        'comprimento',
        'O Valor não pode ser 0',
        (props) => !!props
      ),
      largura: Yup.number().test(
        'largura',
        'O Valor não pode ser 0',
        (props) => !!props
      ),
      peso: Yup.number().test(
        'largura',
        'O Valor não pode ser 0',
        (props) => !!props
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
    onSubmit: (newProductSubmittedValues) => {
      (async (submittedValues) => {
        setLoading(true);

        let response;
        const apiValues = {} as Record<string, string>;
        Object.keys(submittedValues)
          // 👇️ ts-ignore ignores any ts errors on the next line
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          .filter((key) => !!submittedValues[key])
          // eslint-disable-next-line no-return-assign
          .map(
            (key): boolean => (apiValues[key] = submittedValues[key])
          );
        apiValues.price = (
          parseInt(submittedValues.price.replace(/[^0-9]/g, '')) / 100
        ).toString();
        const productData = {
          ...apiValues,
          promotioPrice: apiValues.price,
          percentage: 0,
          tpPreparacaoDias: 10,
          tpPreparacaoHoras: 2,
          tpPreparacaoMinutos: 30,
          vendedorId: user.id,
          vendedorName: user.firstName,
          enderecoLoja: {},
        };

        const dataString = JSON.stringify(productData);

        const formDataToSend = new FormData();
        formDataToSend.append('data', dataString);
        formDataToSend.append('picture', image[0]);

        try {
          response = await api.post(
            'api/products/v1/newProduct',
            formDataToSend
          );
          const { data: products } = response.data;
          console.log(response);
          if (response.data.status == 'CREATED') {
            setModalState({
              ...modalState,
              title: 'Sucesso!',
              description: 'Produto cadastrado com sucesso',
              isVisible: true,
              messageType: MessageTypes.SUCCESS,
              handleContinue: () => {
                setModalState({ ...modalState, isVisible: false });
                navigation.goBack();
              },
            });
          } else {
            setModalState({
              ...modalState,
              title: 'Erro ao cadastrar o Produto!',
              description: 'Verifique os dados introduzidos.',
              isVisible: true,
              messageType: MessageTypes.FAIL,
              handleContinue: () => {
                setModalState({ ...modalState, isVisible: false });
              },
            });
          }
        } catch (e: any) {
          setModalState({
            ...modalState,
            title: 'Algo deu errado ao Cadastrar o Produto!',
            description:
              'Não é possível cadastrar o produto nesse momento, por favor, tente novamente mais tarde.',
            isVisible: true,
            messageType: MessageTypes.FAIL,
            handleContinue: () => {
              setModalState({ ...modalState, isVisible: false });
            },
          });

          setLoading(false);
        } finally {
          setLoading(false);
        }
        // console.log(response)
        if (response) {
          if (image.length === 0) {
            setModalState({
              ...modalState,
              title: 'Feito!',
              description: 'Produto cadastrado com sucesso',
              isVisible: true,
              messageType: MessageTypes.SUCCESS,
              handleContinue: () => {
                setModalState({ ...modalState, isVisible: false });
                navigation.goBack();
              },
            });
          } else {
            const products = response.data.data;
            const { id } = products[products.length - 1];
            try {
              // console.log('image', image)
              const data = new FormData();
              image.map((item) => {
                // const imageValue = URL.createObjectURL({ uri: item, type: 'image/jpeg', name: 'imagename.jpg' });
                const imageValue = {
                  uri: item,
                  type: 'image/jpeg',
                  name: 'imagename.jpg',
                };
                // 👇️ ts-ignore ignores any ts errors on the next line
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                data.append('picture', imageValue);
              });

              const updatedProduct = await (
                await api.put(
                  `/api/products/v1/addPictures?productId=${id}`,
                  data
                )
              ).data.data;
              // console.log('updatedProduct',updatedProduct)

              const filteredProducts = user.products?.filter(
                (item) => item.id !== id
              );
              if (filteredProducts)
                updateUser({
                  ...user,
                  products: [...filteredProducts, updatedProduct],
                });
              else updateUser({ ...user, products: updatedProduct });

              setModalState({
                ...modalState,
                title: 'Feito!',
                description: 'Produto cadastrado com sucesso',
                isVisible: true,
                messageType: MessageTypes.SUCCESS,
                handleContinue: () => {
                  setModalState({ ...modalState, isVisible: false });
                  navigation.goBack();
                },
              });
            } catch (e) {
              errorHandler(
                e,
                '/api/products/v1/addPictures?productId',
                (message) => {
                  setModalState({
                    ...modalState,
                    title: 'Feito!',
                    description:
                      'Produto cadastrado com sucesso, porém não pudemos atualizar as imagens. Edite seu produto para tentar novamente',
                    isVisible: true,
                    messageType: MessageTypes.SUCCESS,
                    handleContinue: () => {
                      setModalState({
                        ...modalState,
                        isVisible: false,
                      });
                      navigation.goBack();
                    },
                  });
                }
              );
            }
          }
        }
        setLoading(false);
      })(newProductSubmittedValues);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!isValid) {
      setModalState({
        ...modalState,
        title: 'Oops!',
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
                <SubTitle>Sobre o produto</SubTitle>
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
                  label="Qual é o stock minimo?*"
                  errors={errors}
                  name="min_stock"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual é a quantidade para alerta?*"
                  errors={errors}
                  name="qtd_alert"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <SubTitle>Sobre a embalagem</SubTitle>
                <TextInput
                  label="Qual o peso? (kg)"
                  errors={errors}
                  name="peso"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual é o pesoCubado? (kg)"
                  errors={errors}
                  name="pesoCubado"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual a altura? (cm)"
                  errors={errors}
                  name="altura"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual o comprimento? (cm)"
                  errors={errors}
                  name="comprimento"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <TextInput
                  label="Qual a largura? (cm)"
                  errors={errors}
                  name="largura"
                  handleChange={handleChange}
                  values={values}
                  keyboardType="number-pad"
                  mode="outlined"
                />
                <SubTitle>Foto</SubTitle>
                <ImagePicker image={image} setImage={setImage} />
                <Button onPress={handleSubmit}>Salvar</Button>
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
