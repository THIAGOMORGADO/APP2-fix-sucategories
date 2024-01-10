import { type IStore } from './store';

export interface IRoute {
  key: string;
  name: string;
  params: IStore;
}
