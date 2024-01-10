import React from 'react';
import { Image } from 'react-native';

const IconVisa = require('../../../../assets/card/visa2.png');
const IconMaster = require('../../../../assets/card/card.png');
const IconElo = require('../../../../assets/card/elo.png');
const IconHipercard = require('../../../../assets/card/icon-hiper-card.png');
type propsBrand = Record<string, any>;

const cardBrand: propsBrand = {
  Visa: {
    icon: (
      <Image
        style={{ width: '25%', height: '25%' }}
        resizeMode="contain"
        source={IconVisa}
      />
    ),
  },
  Mastercard: {
    icon: (
      <Image
        style={{ width: '25%', height: '25%' }}
        resizeMode="contain"
        source={IconMaster}
      />
    ),
  },
  Elo: {
    icon: (
      <Image
        style={{ width: '20%', height: '20%' }}
        resizeMode="contain"
        source={IconElo}
      />
    ),
  },
  Hipercard: {
    icon: (
      <Image
        style={{ width: '25%', height: '25%' }}
        resizeMode="contain"
        source={IconHipercard}
      />
    ),
  },
  Unknown: {
    icon: null,
  },
};

export const getBrand = (number: string) => {
  const validateCardNumber = (number) => {
    const visaRegex = /^4[0-9]{0,15}$/;
    const mastercardRegex = /^5[1-5][0-9]{0,14}$/;
    const eloRegex =
      /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/;
    const hipercardRegex =
      /^(606282\d{0,13}(\d{0,3})?)|(3841\d{0,15})$/;

    if (visaRegex.test(number)) {
      return 'Visa';
    } else if (mastercardRegex.test(number)) {
      return 'Mastercard';
    } else if (eloRegex.test(number)) {
      return 'Elo';
    } else if (hipercardRegex.test(number)) {
      return 'Hipercard';
    } else {
      return 'Unknown';
    }
  };

  if (number && number.length >= 2) {
    const brand = validateCardNumber(number);
    return cardBrand[brand];
  }

  return cardBrand.Unknown;
};
