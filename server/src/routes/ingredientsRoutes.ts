import { Router } from 'express';
import { getIngredients, getIngredientImage, createIngredient, editIngredient, deleteIngredient } from '../controllers/ingredientsController';

const router = Router();

router.get('/', getIngredients);
router.get('/image/:name', getIngredientImage);
router.post('/', createIngredient);
router.put('/:name', editIngredient);
router.delete('/:name', deleteIngredient);

export default router;
