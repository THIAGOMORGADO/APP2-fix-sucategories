import { type IResponse } from './requests';
import { type IEndereco, type CountryList } from './user';

export interface CartItem {
  id: number;
  enderecoLoja: IEndereco;
  qtd: number;
  unidadeMedida: string;
  vendedorId: number;
  price: number;
}

export type Cart = CartItem[] | [];

export interface IProduct {
  id: number;
  name: string;
  country: CountryList;
  category: string;
  vendedorId: number;
  price: number;
  vendedorName: string;
  description: string;
  pictures: string[];
  tpPreparacaoDias: number;
  tpPreparacaoHoras: number;
  enderecoLoja: IEndereco;
  tpPreparacaoMinutos: number;
  quantityAvailable: number;
  peso: number;
  altura: number;
  largura: number;
  comprimento: number;
  pesoCubado: number;
  metrica: number;
  unidadeMedida: string;
  categoriaId?: number;
  min_stock?: number;
  percentage?: number;
}

export interface IProductList extends IResponse {
  content: IProduct[];
}

export interface ResponseProductsProps {
  data: IProductList;
}
