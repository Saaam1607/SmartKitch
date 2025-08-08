interface BaseItem {
  name: string;
  description: string;
  image: string;
  outOfStock: boolean;
  disabled: boolean;
}

export default interface Ingredient extends BaseItem {
    readonly __type?: 'ingredient';
}