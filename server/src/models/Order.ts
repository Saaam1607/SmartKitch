import { Dish } from './Dish'
import { Drink } from './Drink'

export interface Order {
  id: number;
  table_number: number;
  waiter: string;
  taken_at: Date;
  notes: string;
  are_drinks_served: boolean;
  are_dishes_served: boolean;
  dishes_body: { section_name: string, ordered_dishes: {dish: Dish, quantity: number}[] }[],
  drinks_body: { section_name: string, ordered_drinks: {drink: Drink, quantity: number}[] }[],
}