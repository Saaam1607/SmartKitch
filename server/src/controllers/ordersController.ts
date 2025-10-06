import { Request, Response } from 'express';
import * as ordersService from '../services/ordersService';

import { Order } from '../models/Order';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const items = await ordersService.getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newItem: Order = req.body;
    const inserted = await ordersService.createItem(newItem);
    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).json({ message: 'Failed to add item' });
  }
};

export const serveOrderDishes = async (req: Request, res: Response) => {
  try {
    const { id, value }: { id: number; value: boolean } = req.body;
    const editedOrder = await ordersService.serveDishes(id, value);
    res.status(201).json(editedOrder);
  } catch (error) {
    console.error('Error editing item:', error);
    res.status(500).json({ message: 'Failed to edit item' });
  }
}

export const serveOrderDrinks = async (req: Request, res: Response) => {
  try {
    const { id, value }: { id: number; value: boolean } = req.body;
    const editedOrder = await ordersService.serveDrinks(id, value);
    res.status(201).json(editedOrder);
  } catch (error) {
    console.error('Error editing item:', error);
    res.status(500).json({ message: 'Failed to edit item' });
  }
}

// export const editSection = async (req: Request, res: Response) => {
//   try {
//     const newItem = req.body;

//     if (!newItem.name) {
//       return res.status(400).json({ message: 'Item name is required' });
//     }

//     const updatedItem = await ordersService.editItem(newItem);
//     return res.status(200).json(updatedItem);

//   } catch (error: any) {
//     console.error('Error updating item:', error.message || error);

//     if (error.message && error.message.includes('not found')) {
//       return res.status(404).json({ message: error.message });
//     }

//     return res.status(500).json({ message: 'Failed to update item' });
//   }
// };