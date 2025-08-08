import Ingredient from '../types/IngredientType';

interface BaseItem {
  name: string;
  description: string;
  image: string;
  outOfStock: boolean;
  disabled: boolean;
}

const ingredients: Ingredient[] = [
  {
    name: "Mushroom",
    description: "Description",
    image: "",
    outOfStock: false,
    disabled: false,   
  },
  {
    name: "Ham",
    description: "Description",
    image: "",
    outOfStock: false,
    disabled: false,   
  }
]

export const getIngredients = (): Ingredient[] => {
  return ingredients;
};