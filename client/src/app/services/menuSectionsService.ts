import CrudService from "../types/CrudService";

import { MenuSection } from "@my-org/shared";

import { blobToBase64, blobUrlToBlob } from "../utils/blobToBase64";

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
    const itemToSend = newItem

    const res = await fetch(`${API_URL}/${encodeURIComponent(newItem.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToSend),
    });

    if (!res.ok) throw new Error('Failed to edit item');
    return res.json();
  },

  async deleteItem(componentKey: string): Promise<void> {
    return;
  },

};

export default menuSectionsService;