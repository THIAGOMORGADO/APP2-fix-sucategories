import { type IPagination, type IResponse } from './requests';
import { type CountryList, type IEndereco } from './user';

export interface IStore {
  active: boolean;
  alterPassword: true;
  avatar: string;
  bilheteIdentidade: string;
  categoria: 0;
  cnpj: string;
  country: string;
  cpf: string;
  cpfouCNPJ: string;
  email: string;
  exponentPushToken: string;
  firstName: string;
  fullName: string;
  id: 0;
  key: string;
  lastName: string;
  nif: string;
  password: string;
  perfil: string;
  phone: string;
  ponto: 0;
  possuiEntregadores: true;
  proximaDesativacao: Date;
  typePhone: 'MOBILE';
}

export interface IStores {
  content: IStore[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPagination;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

type EnderecoWithoutPais = Omit<IEndereco, 'pais'>;
export interface IEnderecoLoja extends EnderecoWithoutPais {
  pais: CountryList;
}

export interface IStoreList extends IResponse {
  content: IStore[];
}

export interface ResponseStoreProps {
  data: IStoreList;
}
