import { Router } from 'express';
import { getDrinks, createDrink, editDrink, deleteDrink } from '../controllers/drinksController';

const router = Router();

router.get('/', getDrinks);
router.post('/', createDrink);
router.put('/:name', editDrink);
router.delete('/:name', deleteDrink);

export default router;
