import CrudService from "../types/CrudService";

import { Dish } from '@models/Dish';

import { blobToBase64, blobUrlToBlob } from "../utils/blobToBase64";

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/dishes';

export const dishesService: CrudService<Dish> = {
  
  async fetchItems(): Promise<Dish[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(newItem: Dish): Promise<Dish> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to add item');
    return res.json();
  },

  async editItem(newItem: Dish): Promise<Dish> {
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

export default dishesService;