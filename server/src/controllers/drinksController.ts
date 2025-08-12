import { Request, Response } from 'express';
import * as drinksService from '../services/drinksService';

import Drink from '../types/DrinkType';


export const getDrinks = async (req: Request, res: Response) => {
  try {
    const items = await drinksService.getDrinks();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const createDrink = async (req: Request, res: Response) => {
  try {
    const newItem: Drink = req.body;
    const inserted = await drinksService.createDrink(newItem);
    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).json({ message: 'Failed to add item' });
  }
};

export const editDrink = async (req: Request, res: Response) => {
  try {
    const newItem = req.body;

    if (!newItem.name) {
      return res.status(400).json({ message: 'Item name is required' });
    }

    const updatedItem = await drinksService.editDrink(newItem);
    return res.status(200).json(updatedItem);

  } catch (error: any) {
    console.error('Error updating item:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update item' });
  }
};

export const deleteDrink = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: 'Name is required to delete an item' });
    }

    const isDeleted = await drinksService.deleteDrink(name);
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