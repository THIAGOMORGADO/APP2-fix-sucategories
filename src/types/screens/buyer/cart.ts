import { type IEndereco } from '../../../@types';

export interface CartCheckoutProps {
  productId: number;
  enderecoLoja: IEndereco;
  qtdComprada: number;
  vlPago: number;
  unidadeMedida: string;
  productPrice: number;
  vendedorId: number;
}
