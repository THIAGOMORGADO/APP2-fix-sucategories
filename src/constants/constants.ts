const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require('../../assets/images/background_01.png'),
    bannerImage: require('../../assets/images/favourite_food.png'),
    title: 'Escolha uma comida favorita',
    description:
      'Quando você comprar o Black Impala , nós lhe daremos cupons, promoções e recompensas exclusivas',
  },
  {
    id: 2,
    backgroundImage: require('../../assets/images/background_02.png'),
    bannerImage: require('../../assets/images/hot_delivery.png'),
    title: 'Entrega quente para casa',
    description:
      'Tornamos o pedido de comida rápido, simples e gratuito.',
  },
  {
    id: 3,
    backgroundImage: require('../../assets/images/background_01.png'),
    bannerImage: require('../../assets/images/great_food.png'),
    title: 'Receba a boa comida',
    description:
      'Você receberá a ótima comida em uma hora. E ganhe créditos de entrega grátis para cada pedido.',
  },
];

const Fracao = [
  {
    id: 1,
    value: 50,
    label: '50g',
  },
  {
    id: 2,
    value: 100,
    label: '100g',
  },
  {
    id: 3,
    value: 150,
    label: '150g',
  },
  {
    id: 4,
    value: 200,
    label: '200g',
  },
  {
    id: 5,
    value: 250,
    label: '250g',
  },
  {
    id: 6,
    value: 300,
    label: '300g',
  },
  {
    id: 7,
    value: 350,
    label: '350g',
  },
  {
    id: 8,
    value: 400,
    label: '400g',
  },
  {
    id: 9,
    value: 450,
    label: '450g',
  },
  {
    id: 10,
    value: 500,
    label: '500g',
  },
  {
    id: 11,
    value: 550,
    label: '550g',
  },
  {
    id: 12,
    value: 600,
    label: '600g',
  },
  {
    id: 13,
    value: 650,
    label: '650g',
  },
  {
    id: 14,
    value: 700,
    label: '700g',
  },
  {
    id: 15,
    value: 750,
    label: '750g',
  },
  {
    id: 16,
    value: 800,
    label: '800g',
  },
  {
    id: 17,
    value: 850,
    label: '850g',
  },
  {
    id: 18,
    value: 900,
    label: '900g',
  },
  {
    id: 19,
    value: 950,
    label: '950g',
  },
  {
    id: 20,
    value: 1000,
    label: '1000g',
  },
];

const screens = {
  main_layout: 'MainLayout',
  home: 'Home',
  search: 'Pesquisar',
  cart: 'Carrinho',
  favourite: 'Favoritos',
  notification: 'Notificações',
  my_wallet: 'Minha carteira',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.favourite,
  },
  {
    id: 4,
    label: screens.notification,
  },
];

const delivery_time = [
  {
    id: 1,
    label: '10 Mins',
  },
  {
    id: 2,
    label: '20 Mins',
  },
  {
    id: 3,
    label: '30 Mins',
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: 'Burger',
  },
  {
    id: 2,
    label: 'Fast Food',
  },
  {
    id: 3,
    label: 'Pizza',
  },
  {
    id: 4,
    label: 'Asian',
  },
  {
    id: 5,
    label: 'Dessert',
  },
  {
    id: 6,
    label: 'Breakfast',
  },
  {
    id: 7,
    label: 'Vegetable',
  },
  {
    id: 8,
    label: 'Taccos',
  },
];

export default {
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  onboarding_screens,
  Fracao,
};
