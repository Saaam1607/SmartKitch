import CrudService from "../types/CrudService";

import { Drink } from '@models/Drink';

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/drinks';

export const drinksService: CrudService<Drink> = {
  
  async fetchItems(): Promise<Drink[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(newItem: Drink): Promise<Drink> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to add item');
    return res.json();
  },

  async editItem(newItem: Drink): Promise<Drink> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(newItem.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to edit item');
    return res.json();
  },

  async deleteItem(componentKey: string): Promise<void> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(componentKey)}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete item');
    return;
  },
};

export default drinksService;