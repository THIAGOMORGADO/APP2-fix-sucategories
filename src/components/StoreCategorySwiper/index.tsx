import { FlatList, FlatListProps, Pressable } from 'react-native';
import * as S from './styles';
import { CategoryType } from '../../@types';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Button } from '../Button';

export interface StoreCategorySwiperProps
  extends Omit<FlatListProps<CategoryType>, 'renderItem'> {
  onSeeMore?: () => void;
}

export const StoreCategorySwiper = ({
  onSeeMore,
  ...args
}: StoreCategorySwiperProps) => {
  const navigation = useNavigation<any>();
  return (
    <FlatList
      {...args}
      renderItem={({ item, index }) => {
        return (
          <S.ContainerRow key={index}>
            <S.Container
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 4, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 1,
              }}
              onPress={() =>
                navigation.navigate('Shops', {
                  id: item.id,
                  store: true,
                })
              }
            >
              <S.Picture
                source={{
                  uri: item.pictures[0],
                }}
                resizeMode={'stretch'}
              />
              <S.TextContainer>
                <S.Title>{item.nome}</S.Title>
              </S.TextContainer>
            </S.Container>
            {index === (args.data || []).length - 1 ? (
              <S.ButtonMoreContainer>
                <Button onPress={onSeeMore} isMore/>
              </S.ButtonMoreContainer>
            ) : null}
          </S.ContainerRow>
        );
      }}
    />
  );
};
