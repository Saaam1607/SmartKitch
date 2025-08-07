import BaseItem from './BaseItem';

export default interface DishProp extends BaseItem {
  price: number;
  ingredients: string[];
}