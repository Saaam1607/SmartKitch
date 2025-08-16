import { CrudService } from "../types/CrudService";

import { MenuSection } from "@my-org/shared";

const API_URL = 'http://localhost:5001/menuSections';

export const menuSectionsService: CrudService<MenuSection> = {
  
  async fetchItems(): Promise<MenuSection[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(newItem: MenuSection): Promise<MenuSection> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to add Menu Section');
    return res.json();
  },

  async editItem(newItem: MenuSection): Promise<MenuSection> {
    let imageBase64: string = '';

    if (newItem?.image instanceof Blob) {
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

};

export default menuSectionsService;