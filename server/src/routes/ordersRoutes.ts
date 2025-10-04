import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/ordersController';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
// router.put('/:name', editSection);
// router.delete('/:name', deleteDish);

export default router;
