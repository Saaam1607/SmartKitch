import BaseItemType from './BaseItemType';

export default interface Ingredient extends BaseItemType {
  isAddable: boolean;
  additionPrice: number;
}