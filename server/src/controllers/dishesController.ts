import { Request, Response } from 'express';
import * as dishesService from '../services/dishesService';

import { Dish } from '../models/Dish';

export const getDishes = async (req: Request, res: Response) => {
  try {
    const items = await dishesService.getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const getDishImage = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const buffer = await dishesService.getItemImage(name);

    if (!buffer) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    });

    return res.end(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dish image' });
  }
};

export const createDish = async (req: Request, res: Response) => {
  try {
    const newItem: Dish = req.body;
    const inserted = await dishesService.createItem(newItem);
    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).json({ message: 'Failed to add item' });
  }
};

export const editDish = async (req: Request, res: Response) => {
  try {
    const newItem = req.body;

    if (!newItem.name) {
      return res.status(400).json({ message: 'Item name is required' });
    }

    const updatedItem = await dishesService.editItem(newItem);
    return res.status(200).json(updatedItem);

  } catch (error: any) {
    console.error('Error updating item:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update item' });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: 'Name is required to delete an item' });
    }

    const isDeleted = await dishesService.deleteItem(name);
    if (isDeleted) {
      return res.status(200).json({ message: `Item '${name}' deleted successfully.` });
    } else {
      return res.status(404).json({ message: `Item '${name}' not found.` });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ message: 'Failed to delete item' });
  }
};