import { type IPagination } from './requests';
export interface CategoryType {
  id: number;
  name: string;
  avatar: string;
  pictures: string[];
  category: string;
  superCategory: string | null;
  nome: string;
}

export interface CategoryResponseType {
  data: {
    content: CategoryType[];
  };
}
export interface ICategories {
  content: CategoryType[];
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
