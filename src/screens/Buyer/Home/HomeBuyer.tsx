import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import FilterModal from './FilterModal';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from '../../../constants';
import {
  HorizontalFoodCard,
  VerticalFoodCard,
} from '../../../components';
import { useNavigation } from '@react-navigation/native';

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Mostrar todos
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};
const Home = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState(1);
  const [selectedMenuType, setSelectedMenutype] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);
  const [recommend, setRecommend] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    const selectedRecommend = dummyData.menu.find(
      (a) => a.name == 'Recomendado'
    );
    const selectedPopular = dummyData.menu.find(
      (a) => a.name == 'Popular'
    );
    const selectedMenu = dummyData.menu.find(
      (a) => a.id == menuTypeId
    );

    setPopular(
      selectedPopular?.list.filter((a) =>
        a.categories.includes(categoryId)
      )
    );
    setRecommend(
      selectedRecommend?.list.filter((a) =>
        a.categories.includes(categoryId)
      )
    );
    setMenuList(
      selectedMenu?.list.filter((a) =>
        a.categories.includes(categoryId)
      )
    );
  }
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="Pesquisar comida"
        />
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index === dummyData.menu.lenght - 1
                    ? SIZES.padding
                    : 0,
              }}
              onPress={() => {
                setSelectedMenutype(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenuType == item.id
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderRecommendedSection() {
    return (
      <Section
        title="Recomendado"
        onPress={() => {
          console.log('Recomendado');
        }}
      >
        <FlatList
          data={recommend}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight:
                    index == recommend.length - 1 ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: 'center',
                }}
                imageStyle={{
                  marginTop: 35,
                  height: 150,
                  width: 150,
                }}
                item={item}
                onPress={() => {
                  navigation.navigate('FoodDetails');
                }}
              />
            );
          }}
        />
      </Section>
    );
  }
  function renderPopularSection() {
    return (
      <Section
        title="Popular perto de você"
        onPress={() => {
          console.log('pressionou');
        }}
      >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight:
                    index == popular.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() => {
                  navigation.navigate('FoodDetails');
                }}
              />
            );
          }}
        />
      </Section>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 55,
                marginTop: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.categories.length - 1
                    ? SIZES.padding
                    : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategoryId == item.id
                    ? COLORS.primary
                    : COLORS.lightGray2,
              }}
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}
            >
              <Image
                source={item.icon}
                style={{
                  marginTop: 5,
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color:
                    selectedCategoryId == item.id
                      ? COLORS.white
                      : COLORS.darkGray,
                  textAlign: 'center',
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS,
          }}
        >
          Entrega para
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            {dummyData?.myProfile?.address}
          </Text>
          <Image
            source={icons.down_arrow}
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderSearch()}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => {
            setShowFilterModal(false);
          }}
        />
      )}

      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderDeliveryTo()}
            {renderFoodCategories()}
            {renderPopularSection()}
            {renderRecommendedSection()}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => {
                navigation.navigate('FoodDetails');
              }}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

export default Home;
