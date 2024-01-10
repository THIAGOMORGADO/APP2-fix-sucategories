import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from '../constants';
import NumberFormat from '../utils/NumberFormat';
import { colors } from '../constants/colors';
import { imgNotFound } from '../constants/imgNotFound';
const HorizontalFoodCard = ({
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  const image =
    !!item.pictures?.length && !!item.pictures[0]
      ? { uri: item.pictures[0] }
      : imgNotFound;
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: colors.default.bgLight,
        ...containerStyle,
        padding: 10,
      }}
      onPress={onPress}
    >
      <Image
        source={{
          uri: image.uri,
        }}
        style={imageStyle}
        resizeMode='center'
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ color: colors.default.green, ...FONTS.h3 }}>
          {item.name}
        </Text>

        <Text
          style={{
            color: colors.default.green,
            marginTop: SIZES.base,
            fontWeight: 'bold',
            ...FONTS.h2,
          }}
        >
          {'R$ ' + item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
