export interface Order {
  id: number;
  table_number: number;
  waiter: string;
  taken_at: Date;
  notes: string;
  dishes_names: string[];
  drinks_names: string[];
}