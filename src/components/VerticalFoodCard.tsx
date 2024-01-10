import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import { colors } from '../constants/colors';
const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        height: 280,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: colors.default.green,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite
              ? COLORS.primary
              : COLORS.gray,
          }}
        />
      </View>

      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{
            uri: item.avatar,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: -20,
        }}
      >
        <Text style={{ ...FONTS.h3, color: colors.default.bgLight }}>
          {item.nameLoja}
        </Text>

        <Text
          style={{
            marginTop: SIZES.radius,
            color: colors.default.bgLight,
            ...FONTS.h2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.fullName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
