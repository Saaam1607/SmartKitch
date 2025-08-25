import BaseItem from './BaseItem';

export default interface Dish extends BaseItem {
  price: number;
  ingredients: string[];
  image: string;
  outOfStock: boolean;
}