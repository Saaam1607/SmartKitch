import { BaseItem } from './BaseItem';

export interface Dish extends BaseItem {
  price: number;
  ingredients: string[];
  image: string;
  outOfStock: boolean;
}