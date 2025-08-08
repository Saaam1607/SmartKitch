import { Request, Response } from 'express';
import * as ingredientsService from '../services/ingredientsService';

export const getAllIngredients = (req: Request, res: Response): void => {
  const ingredients = ingredientsService.getIngredients();
  res.json(ingredients);
};