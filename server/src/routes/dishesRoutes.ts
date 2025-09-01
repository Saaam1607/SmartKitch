import { Router } from 'express';
import { getDishes, getDishImage, createDish, editDish, deleteDish } from '../controllers/dishesController';

const router = Router();

router.get('/', getDishes);
router.get('/image/:name', getDishImage);
router.post('/', createDish);
router.put('/:name', editDish);
router.delete('/:name', deleteDish);

export default router;
