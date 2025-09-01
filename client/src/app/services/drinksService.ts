import CrudService from "../types/CrudService";

import { Drink } from '@models/Drink';

import { blobToBase64, blobUrlToBlob } from "../utils/blobToBase64";

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/drinks';

export const drinksService: CrudService<Drink> = {
  
  async fetchItems(): Promise<Drink[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async fetchItemImage(componentKey: string): Promise<string> {
    return `${API_URL}/image/${encodeURIComponent(componentKey)}`;
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
    let imageBase64: string = '';

    if (newItem.image.startsWith('data:image')) {
      imageBase64 = newItem.image;
    } else if (newItem.image.startsWith('blob:')) {
      const blob = await blobUrlToBlob(newItem.image);
      imageBase64 = await blobToBase64(blob);
    }

    const itemToSend = { ...newItem, image: imageBase64 };

    const res = await fetch(`${API_URL}/${encodeURIComponent(newItem.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToSend),
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