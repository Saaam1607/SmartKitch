import CrudService from "../types/CrudService";

import { Order } from '@models/Order';

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/orders';

export const ordersService: CrudService<Order> = {
  
  async fetchItems(): Promise<Order[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(newItem: Order): Promise<Order> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error('Failed to add Menu Section');
    return res.json();
  },

  async editItem(newItem: Order): Promise<Order> {
    throw new Error('not implemented yet');

    
    // const res = await fetch(`${API_URL}/${encodeURIComponent(newItem.name)}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newItem),
    // });

    // if (!res.ok) throw new Error('Failed to edit item');
    // return res.json();
  },

  async deleteItem(componentKey: string): Promise<void> {
    throw new Error('not implemented yet');
  },

};

export default ordersService;