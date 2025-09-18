import { Router } from 'express';
import { getOrders } from '../controllers/ordersController';

const router = Router();

router.get('/', getOrders);
// router.post('/', createSection);
// router.put('/:name', editSection);
// router.delete('/:name', deleteDish);

export default router;
