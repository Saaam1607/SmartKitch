import BaseItem from './BaseItem';

export default interface IngredientProp extends BaseItem {
    isAddable: boolean;
    additionPrice: number;
}