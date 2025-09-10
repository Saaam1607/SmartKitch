import { Request, Response } from 'express';
import * as ingredientsService from '../services/ingredientsService';

import { Ingredient } from '../models/Ingredient';

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await ingredientsService.getItems();
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching ingredients' });
  }
};

export const getIngredientImage = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const buffer = await ingredientsService.getItemImage(name);

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
    res.status(500).json({ message: 'Error fetching ingredient image' });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const newIngredient: Ingredient = req.body;
    const inserted = await ingredientsService.createItem(newIngredient);
    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error inserting ingredient:', error);
    res.status(500).json({ message: 'Failed to add ingredient' });
  }
};

export const editIngredient = async (req: Request, res: Response) => {
  try {
    const newIngredient = req.body;

    if (!newIngredient.name) {
      return res.status(400).json({ message: 'Ingredient name is required' });
    }

    const updatedIngredient = await ingredientsService.editItem(newIngredient);
    return res.status(200).json(updatedIngredient);

  } catch (error: any) {
    console.error('Error updating ingredient:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
};

export const editIngredientImage = async (req: Request, res: Response) => {
  try {

    const { name } = req.params;
    const { image: newImage } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Ingredient name is required' });
    }

    const updatedIngredient = await ingredientsService.editItemImage(name, newImage);
    return res.status(200).json(updatedIngredient);

  } catch (error: any) {
    console.error('Error updating ingredient:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: 'Name is required to delete an ingredient' });
    }

    const isDeleted = await ingredientsService.deleteItem(name);
    if (isDeleted) {
      return res.status(200).json({ message: `Ingredient '${name}' deleted successfully.` });
    } else {
      return res.status(404).json({ message: `Ingredient '${name}' not found.` });
    }
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    return res.status(500).json({ message: 'Failed to delete ingredient' });
  }
};