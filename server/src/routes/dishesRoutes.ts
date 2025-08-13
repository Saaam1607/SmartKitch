import { Router } from 'express';
import { getDishes, createDish, editDish, deleteDish } from '../controllers/dishesController';

const router = Router();

router.get('/', getDishes);
router.post('/', createDish);
router.put('/:name', editDish);
router.delete('/:name', deleteDish);

export default router;
