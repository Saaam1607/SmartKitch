import { create } from 'zustand';

import { Ingredient } from '@models/Ingredient';
import type { Dish } from '@models/Dish';
import { Drink } from '@models/Drink';
import { MenuSection } from '@models/MenuSection';

import { Order } from '@models/Order';

import { User } from '@models/User';

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

  orders: Order[];
  setOrders: (newItems: Order[]) => void;
  updateOrder: (newItem: Order) => void;

  users: User[];
  setUsers: (newItems: User[]) => void;
  updateUser: (newItem: User) => void;
};

const useStore = create<Store>((set, get) => ({
  componentKey: '',
  ingredients: [],
  dishes: [],
  drinks: [],
  menuSections: [],
  orders: [],
  users: [],
  
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

  setOrders: (newItems: Order[]) => {
    set({ orders: newItems });
  },

  updateOrder: (newItem: Order) => {
    set((state) => ({
      orders: state.orders.map((item) =>
        item.id === newItem.id ? newItem : item
      ),
    }));
  },

  setUsers: (newItems: User[]) => {
    set({ users: newItems });
  },

  updateUser: (newItem: User) => {
    set((state) => ({
      users: state.users.map((item) =>
        item.id === newItem.id ? newItem : item
      ),
    }));
  },

}));

export default useStore;
