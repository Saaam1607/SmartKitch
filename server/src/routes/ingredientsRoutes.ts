import { Router } from 'express';
import * as ingredientsController from '../controllers/ingredientsController';

const router = Router();

router.get('/', ingredientsController.getAllIngredients);

export default router;
