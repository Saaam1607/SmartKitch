import { create } from 'zustand';

import IngredientProp from '../types/IngredientProp';
import DishProp from '../types/DishProp';
import DrinkProp from '../types/DrinkProp';
import { MenuSection } from "@my-org/shared";

type Store = {
  componentKey: string;
  resetComponentKey: () => void;
  setComponentKey: (newComponentKey: string) => boolean;

  ingredients: IngredientProp[];
  setIngredients: (newIngredients: IngredientProp[]) => void;
  updateIngredient: (newIngredient: IngredientProp) => void;
  
  dishes: DishProp[];
  setIngredients: (newItems: IngredientProp[]) => void;
  updateIngredient: (newItem: IngredientProp) => void;

  drinks: DrinkProp[];
  setIngredients: (newItems: DrinkProp[]) => void;
  updateIngredient: (newItem: DrinkProp) => void;

  menuSections: MenuSection[];
  setMenuSections: (newItems: MenuSection[]) => void;
  updateMenuSection: (newItem: MenuSection) => void;
};

const useStore = create<Store>((set, get) => ({
  componentKey: '',
  ingredients: [],
  dishes: [],
  drinks: [],
  menuSections: [],
  
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

  setDishes: (newItems: DishProp[]) => {
    set({ dishes: newItems });
  },

  updateDish: (newItem: DishProp) => {
    set((state) => ({
      dishes: state.dishes.map((item) =>
        item.name === newItem.name ? newItem : item
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

  setMenuSections: (newItems: MenuSection[]) => {
    set({ menuSections: newItems });
  },

  updateMenuSection: (newItem: MenuSection) => {
    set((state) => ({
      menuSections: state.menuSections.map((item) =>
        item.name === newItem.name ? newItem : item
      ),
    }));
  },

}));

export default useStore;
