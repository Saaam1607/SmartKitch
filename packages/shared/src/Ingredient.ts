import BaseItem from './BaseItem';

export default interface Ingredient extends BaseItem {
  isAddable: boolean;
  additionPrice: number;
  image: string;
  outOfStock: boolean;
}