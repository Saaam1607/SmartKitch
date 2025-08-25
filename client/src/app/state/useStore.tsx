import { create } from 'zustand';

import { Ingredient, Dish, Drink } from "@my-org/shared";
import { MenuSection } from "@my-org/shared";

type Store = {
  componentKey: string;
  resetComponentKey: () => void;
  setComponentKey: (newComponentKey: string) => boolean;

  ingredients: Ingredient[];
  setIngredients: (newIngredients: Ingredient[]) => void;
  updateIngredient: (newIngredient: Ingredient) => void;

  dishes: Dish[];
  setDishes: (newItems: Dish[]) => void;
  updateDish: (newItem: Dish) => void;

  drinks: Drink[];
  setDrinks: (newItems: Drink[]) => void;
  updateDrink: (newItem: Drink) => void;

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
  
  setIngredients: (newIngredients: Ingredient[]) => {
    set({ ingredients: newIngredients });
  },

  updateIngredient: (newIngredient: Ingredient) => {
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.name === newIngredient.name ? newIngredient : ingredient
      ),
    }));
  },

  setDishes: (newItems: Dish[]) => {
    set({ dishes: newItems });
  },

  updateDish: (newItem: Dish) => {
    set((state) => ({
      dishes: state.dishes.map((item) =>
        item.name === newItem.name ? newItem : item
      ),
    }));
  },

  setDrinks: (newItems: Drink[]) => {
    set({ drinks: newItems });
  },

  updateDrink: (newItem: Drink) => {
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
