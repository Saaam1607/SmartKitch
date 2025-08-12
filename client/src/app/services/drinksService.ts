import { CrudService } from "../types/CrudService";

import DrinkProp from '../types/DrinkProp'

const API_URL = 'http://localhost:5001/drinks';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function blobUrlToBlob(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
}

export const drinksService: CrudService<DrinkProp> = {
  
  async fetchItems(): Promise<DrinkProp[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(newItem: DrinkProp): Promise<DrinkProp> {
    const base64Image = await blobToBase64(newItem.image);
    newItem = { ...newItem, image: base64Image };
    
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to add item');
    return res.json();
  },

  async editItem(newItem: DrinkProp): Promise<DrinkProp> {
    let imageBase64: string = '';

    if (newItem.image instanceof Blob) {
      imageBase64 = await blobToBase64(newItem.image);
    } else if (typeof newItem.image === 'string') {
      if (newItem.image.startsWith('data:image')) {
        imageBase64 = newItem.image;
      } else if (newItem.image.startsWith('blob:')) {
        const blob = await blobUrlToBlob(newItem.image);
        imageBase64 = await blobToBase64(blob);
      }
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