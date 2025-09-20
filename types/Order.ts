export interface Order {
  id: number;
  table_number: number;
  waiter: string;
  taken_at: Date;
  notes: string;
  ordered_dishes: {dish_name: string, quantity: number}[];
  ordered_drinks: {drink_name: string, quantity: number}[];
}