import { Router } from 'express';
import { getIngredients, createIngredient, editIngredient, deleteIngredient } from '../controllers/ingredientsController';

const router = Router();

router.get('/', getIngredients);
router.post('/', createIngredient);
router.put('/:name', editIngredient);
router.delete('/:name', deleteIngredient);

export default router;
