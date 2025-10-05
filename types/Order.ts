import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';
import type { MenuSection } from '@models/MenuSection';

export interface DishOrderBody {
  section_name: string;
  ordered_dishes: {
    dish: Dish;
    quantity: number;
  }[];
}

export interface DrinkOrderBody {
  section_name: string;
  ordered_drinks: {
    drink: Drink;
    quantity: number;
  }[];
}

export interface Order {
  id: number;
  table_number: number;
  waiter: string;
  taken_at: Date;
  notes: string;
  dishes_body: DishOrderBody[];
  drinks_body: DrinkOrderBody[];
}