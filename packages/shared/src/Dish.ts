import BaseItemType from './BaseItemType';

export default interface Dish extends BaseItemType {
  price: number;
  ingredients: string[];
}