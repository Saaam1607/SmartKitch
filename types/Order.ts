import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';
import type { MenuSection } from '@models/MenuSection';

export interface Order {
  id: number;
  table_number: number;
  waiter: string;
  taken_at: Date;
  notes: string;
  dishes_body: { section_name: string, ordered_dishes: {dish: Dish, quantity: number}[] }[],
  drinks_body: { section_name: string, ordered_drinks: {dish: Drink, quantity: number}[] }[],
}