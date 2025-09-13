import { BaseItem } from './BaseItem';

export interface Ingredient extends BaseItem {
  isAddable: boolean;
  additionPrice: number;
  imageUrl: string;
  outOfStock: boolean;
}