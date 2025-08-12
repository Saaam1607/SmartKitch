import { create } from 'zustand';

import IngredientProp from '../types/IngredientProp';
import DrinkProp from '../types/DrinkProp';

type Store = {
  componentKey: string;
  resetComponentKey: () => void;
  setComponentKey: (newComponentKey: string) => boolean;

  ingredients: IngredientProp[];
  setIngredients: (newIngredients: IngredientProp[]) => void;
  updateIngredient: (newIngredient: IngredientProp) => void;
  
  drinks: DrinkProp[];
  setIngredients: (newItems: DrinkProp[]) => void;
  updateIngredient: (newItem: DrinkProp) => void;
};

const useStore = create<Store>((set, get) => ({
  componentKey: '',
  ingredients: [],
  drinks: [],
  
  setIngredients: (newIngredients: IngredientProp[]) => {
    set({ ingredients: newIngredients });
  },

  updateIngredient: (newIngredient: IngredientProp) => {
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.name === newIngredient.name ? newIngredient : ingredient
      ),
    }));
  },

  setDrinks: (newItems: DrinkProp[]) => {
    set({ drinks: newItems });
  },

  updateDrink: (newItem: DrinkProp) => {
    set((state) => ({
      drinks: state.drinks.map((item) =>
        item.name === newItem.name ? newItem : item
      ),
    }));
  },

  resetComponentKey: () => {
    set({ componentKey: "" })
  },

  setComponentKey: (newComponentKey: string) => {
    const currentKey = get().componentKey;
    if (currentKey === "") {
      set({ componentKey: newComponentKey });
      return true;
    } else {
      return false;
    }
  },
}));

export default useStore;
