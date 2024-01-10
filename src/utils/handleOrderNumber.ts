import { type IVenda } from '../@types';
import { DateHandler } from './DateHandler';

export const handleOrderNumber = (venda: IVenda): string => {
  const code = DateHandler(
    venda.compras[0]?.createdAt as unknown as Date,
    {
      dateFormat: 'YYYY/MM/DD',
    }
  ).replace(/\//g, '');
  const orderNumber = `${venda.id}`.padStart(5, '0');
  return code + orderNumber;
};
