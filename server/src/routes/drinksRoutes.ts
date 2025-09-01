import { Router } from 'express';
import { getDrinks, getDrinkImage, createDrink, editDrink, deleteDrink } from '../controllers/drinksController';

const router = Router();

router.get('/', getDrinks);
router.get('/image/:name', getDrinkImage);
router.post('/', createDrink);
router.put('/:name', editDrink);
router.delete('/:name', deleteDrink);

export default router;
