import { BaseItem } from './BaseItem';

export interface Drink extends BaseItem {
  price: number;
  image: string;
  outOfStock: boolean;
}