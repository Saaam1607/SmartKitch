import { Router } from 'express';
import { getIngredients, createIngredient, editIngredient, editIngredientImage, deleteIngredient } from '../controllers/ingredientsController';

const router = Router();

router.get('/', getIngredients);
// router.get('/image/:name', getIngredientImage);
router.post('/', createIngredient);
router.put('/:name', editIngredient);
router.put('/image/:name', editIngredientImage);
router.delete('/:name', deleteIngredient);

export default router;
