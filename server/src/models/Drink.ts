import { BaseItem } from './BaseItem';

export interface Drink extends BaseItem {
  isDrink: boolean;
  price: number;
  imageUrl: string;
  outOfStock: boolean;
}