import { Request, Response } from 'express';
import * as menuSectionsService from '../services/menuSectionsService';

import { MenuSection } from "@my-org/shared";

export const getMenuSections = async (req: Request, res: Response) => {
  try {
    const items = await menuSectionsService.getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const newItem: MenuSection = req.body;
    const inserted = await menuSectionsService.createItem(newItem);
    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).json({ message: 'Failed to add item' });
  }
};

export const editSection = async (req: Request, res: Response) => {
  try {
    const newItem = req.body;

    if (!newItem.name) {
      return res.status(400).json({ message: 'Item name is required' });
    }

    const updatedItem = await menuSectionsService.editItem(newItem);
    return res.status(200).json(updatedItem);

  } catch (error: any) {
    console.error('Error updating item:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update item' });
  }
};