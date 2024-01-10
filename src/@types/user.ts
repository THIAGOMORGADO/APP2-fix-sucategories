/* eslint-disable import/no-cycle */
import {
  type EnabledCountriesValueType,
  type EnabledCountryListType,
} from '../constants/country';
import { type CidadeAtuacaoType } from './city';
import { type IProduct } from './products';
import { IEnderecoLoja } from './store';

export type Countries = EnabledCountriesValueType | undefined;
export type CountryList = EnabledCountryListType | undefined;
export type ICompraStatus =
  | 'AGUARDANDO_PAGAMENTO'
  | 'AGUARDANDO_CONFIRMACAO'
  | 'EM_PREPARACAO'
  | 'A_CAMINHO'
  | 'ENTREGUE'
  | 'CANCELADA';
export type IStatusEntrega =
  | 'NOVA'
  | 'TOMADA'
  | 'A_CAMINHO'
  | 'FINALIZADA';
export type IVendaStatus =
  | 'NOVA'
  | 'EM_PREPARACAO'
  | 'AGUARDANDO_ENTREGADOR'
  | 'A_CAMINHO'
  | 'FINALIZADA'
  | 'CANCELADA';

export interface IEntrega {
  compradorName: string;
  createdAt: Date;
  distanciaEntrega: string;
  enderecoEntrega: IEndereco;
  enderecoLoja: IEndereco;
  entregadorId: number;
  id: number;
  pesoCubado: number;
  statusEntrega: IStatusEntrega;
  valorRemuneracao: number;
  valoresRemuneracao: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
  vendaId: number;
  vendedorName: string;
}

export interface IEndereco {
  id?: number;
  pais: Countries;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  complemento: string;
}

interface IAvaliacao {
  avaliadorId: number;
  comentario: string;
  createdAt: Date;
  estrelas: number;
  id: number;
}

export interface ICompra {
  compradorId: number;
  compradorName: string;
  compradorPhone: string;
  createdAt: {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    nanos: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
  };
  distanciaEntrega: string;
  enderecoEntrega: {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    estado: string;
    id: number;
    numero: string;
    pais: Countries;
    rua: string;
  };
  enderecoLoja: {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    estado: string;
    id: number;
    numero: string;
    pais: CountryList;
    rua: string;
  };
  formaPagamento: string;
  id: number;
  observacao: string;
  productDescription: string;
  productId: number;
  productName: string;
  productPictures: string[];
  productPrice: number;
  qtdComprada: number;
  status: string;
  taxaEntrega: number;
  unidadeMedida: string;
  vendedorId: number;
  vendedorName: string;
  vendedorPhone: string;
  vlPago: number;
}

export interface IUserCompra {
  compradorId: number;
  compras: ICompra[];
  enderecoEntrega: string;
  formaPagamento: string;
  id: number;
  statusCompra: ICompraStatus;
  vlTotal: number;
  codigoPagamento: string;
}

export interface IConta {
  emailPagSeguro?: string;
  modifiedAt: Date;
  saldo: number;
  instituicao?: string;
  tipoConta?: string;
  agencia?: string;
  nuConta?: string;
  digito?: string;
  pix?: string;
}

export type ComprasTypes = ICompra[];

export interface IVenda {
  valorRemuneracao: number;
  acaminhoAt: Date;
  compradorName: string;
  compras: ComprasTypes;
  confirmadaAt: Date;
  createdAt: Date;
  enderecoEntrega: IEndereco;
  finalizadaAt: Date;
  formaPagamento: string;
  id: number;
  rejeitadaAt: Date;
  status: IVendaStatus;
  vlTotal: number;
  taxaFieldrightEntrega: number;
  taxaFieldrightVenda: number;
  valorLiquido: number;
}

export interface User {
  active?: boolean;
  alterPassword: boolean;
  avaliacoes?: IAvaliacao[];
  avatar?: string;
  bilheteIdentidade?: string;
  cnh?: string;
  cnpj?: string;
  compras?: IUserCompra[];
  conta?: IConta;
  country?: CountryList;
  cpf?: string;
  createdAt?: Date;
  email?: string;
  endereco?: IEndereco;
  firstName?: string;
  enderecosSalvos?: IEndereco[];
  id?: number;
  intro?: boolean;
  lastName?: string;
  nif?: string;
  password?: string;
  perfil: 'comprador' | 'motorista' | 'vendedor';
  phone?: string;
  products?: IProduct[];
  proximaDesativacao?: any;
  renavam?: string;
  vendas?: IVenda[];
  tipoVeiculo?: 'BIKE' | 'CARRO' | 'MOTO' | 'EMPRESA';
  cidadeAtuacao?: CidadeAtuacaoType;
  possuiEntregadores?: boolean;
}
