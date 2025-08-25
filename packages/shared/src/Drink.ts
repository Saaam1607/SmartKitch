import BaseItem from './BaseItem';

export default interface Drink extends BaseItem {
  price: number;
  image: string;
  outOfStock: boolean;
}