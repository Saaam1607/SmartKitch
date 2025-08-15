import { CrudService } from "../types/CrudService";

import { MenuSection } from "@my-org/shared";

const API_URL = 'http://localhost:5001/menuSections';

export const menuSectionsService: CrudService<MenuSection> = {
  
  async fetchItems(): Promise<MenuSection[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

};

export default menuSectionsService;