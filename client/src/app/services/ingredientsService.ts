import CrudService from "../types/CrudService";

import { Ingredient } from '@models/Ingredient';

import { blobToBase64, blobUrlToBlob } from "../utils/blobToBase64";

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/ingredients';

export const ingredientsService: CrudService<Ingredient> = {
  
  async fetchItems(): Promise<Ingredient[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch ingredients');
    return res.json();
  },

  async addItem(newIngredient: Ingredient): Promise<Ingredient> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIngredient),
    });

    if (!res.ok) throw new Error('Failed to add ingredient');
    return res.json();
  },

  async editItem(newIngredient: Ingredient): Promise<Ingredient> {
    let imageBase64: string = '';

    if (newIngredient.image.startsWith('data:image')) {
      imageBase64 = newIngredient.image;
    } else if (newIngredient.image.startsWith('blob:')) {
      const blob = await blobUrlToBlob(newIngredient.image);
      imageBase64 = await blobToBase64(blob);
    }

    const ingredientToSend = { ...newIngredient, image: imageBase64 };

    const res = await fetch(`${API_URL}/${encodeURIComponent(newIngredient.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredientToSend),
    });

    if (!res.ok) throw new Error('Failed to edit ingredient');
    return res.json();
  },

  async deleteItem(componentKey: string): Promise<void> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(componentKey)}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete ingredient');
    return;
  },
};

export default ingredientsService;