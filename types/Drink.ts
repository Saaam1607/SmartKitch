import { BaseItem } from './BaseItem';

export interface Drink extends BaseItem {
  price: number;
  imageUrl: string;
  outOfStock: boolean;
}