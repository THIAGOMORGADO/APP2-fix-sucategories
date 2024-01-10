import { icons, images } from '.';

const myProfile = {
  name: 'B2B BURGUER HOUSE',
  profile_image: images.profile,
  address: 'Selecione a categoria',
};

const categories = [
  {
    id: 1,
    name: 'Comida rápida',
    icon: icons.burger,
  },
  {
    id: 2,
    name: 'Frutas',
    icon: icons.cherry,
  },
  {
    id: 3,
    name: 'Artigo de arroz',
    icon: icons.rice,
  },
];

const hamburger = {
  id: 1,
  name: 'Hamburger',
  description: 'Hambúrguer de frango',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
};

const hotTacos = {
  id: 2,
  name: 'Tacos Quentes',
  description: 'Tortilha e tacos mexicanos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
};

const vegBiryani = {
  id: 3,
  name: 'Veg Biryani',
  description: 'Biryani de legumes indiano',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
};

const vegBiryani1 = {
  id: 3,
  name: 'Veg Biryani',
  description:
    'Um prato de arroz favorito misto de especiarias e legumes que é tipicamente preparado por camadas de molho biryani e arroz basmati em um recipiente de fundo plano',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
};

const wrapSandwich = {
  id: 4,
  name: 'Wrap Sandwich',
  description: 'Sanduíche de legumes grelhados',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
};
/// //

const menu = [
  {
    id: 1,
    name: 'Novos produtos',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: 'Produtos da semana',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
];

const sizes = [
  {
    id: 1,
    label: '12"',
  },
  {
    id: 2,
    label: '14"',
  },
  {
    id: 3,
    label: '16"',
  },
];

const myCart = [
  {
    ...hamburger,
    qty: 1,
  },
  {
    ...hotTacos,
    qty: 1,
  },
  {
    ...vegBiryani,
    qty: 1,
  },
];

const myCards = [
  {
    id: 1,
    name: 'Master Card',
    icon: require('../../assets/icons/mastercard.png'),
    card_no: '1234',
  },
  {
    id: 2,
    name: 'Google Pay',
    icon: require('../../assets/icons/google.png'),
    card_no: '1234',
  },
];

const allCards = [
  {
    id: 1,
    name: 'Apple Pay',
    icon: require('../../assets/icons/apple.png'),
  },
  {
    id: 2,
    name: 'Visa',
    icon: require('../../assets/icons/visa.png'),
  },
  {
    id: 3,
    name: 'PayPal',
    icon: require('../../assets/icons/paypal.png'),
  },
  {
    id: 4,
    name: 'Google Pay',
    icon: require('../../assets/icons/google.png'),
  },
  {
    id: 5,
    name: 'Master Card',
    icon: require('../../assets/icons/mastercard.png'),
  },
];

const fromLocs = [
  {
    latitude: 1.5347282806345879,
    longitude: 110.35632207358996,
  },
  {
    latitude: 1.556306570595712,
    longitude: 110.35504616746915,
  },
  {
    latitude: 1.5238753474714375,
    longitude: 110.34261833833622,
  },
  {
    latitude: 1.5578068150528928,
    longitude: 110.35482523764315,
  },
  {
    latitude: 1.558050496260768,
    longitude: 110.34743759630511,
  },
  {
    latitude: 1.5573478487252896,
    longitude: 110.35568783282145,
  },
];

export default {
  vegBiryani1,

  myProfile,
  categories,
  menu,
  sizes,
  myCart,
  myCards,
  allCards,
  fromLocs,
};
