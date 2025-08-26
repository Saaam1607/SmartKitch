import { BaseItem } from './BaseItem';

export interface Ingredient extends BaseItem {
  isAddable: boolean;
  additionPrice: number;
  image: string;
  outOfStock: boolean;
}