import BaseItem from './BaseItem';

export default interface IngredientProp extends BaseItem {
    readonly __type?: 'ingredient';
}