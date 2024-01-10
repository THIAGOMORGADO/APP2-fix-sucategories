import { type IVenda, type IVendaStatus } from '../@types';

export const vendasFilter = (
  vendas: IVenda[],
  filter: IVendaStatus[]
) => {
  return vendas
    .filter((i: IVenda) => filter.some((s) => s === i.status))
    .sort((a, b) => (a.id < b.id ? 1 : -1));
};
