import { create } from 'zustand';

import IngredientProp from '../types/IngredientProp';

type Store = {
  componentKey: string;
  ingredients: IngredientProp[];

  setIngredients: (newIngredients: IngredientProp[]) => void;
  updateIngredient: (newIngredient: IngredientProp) => void;
  
  resetComponentKey: () => void;
  setComponentKey: (newComponentKey: string) => boolean;
};

const useStore = create<Store>((set, get) => ({
  componentKey: '',
  ingredients: [],
  
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
