import { Router } from 'express';
import { getOrders, createOrder, serveOrderDishes, serveOrderDrinks } from '../controllers/ordersController';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/dishes', serveOrderDishes);
router.put('/drinks', serveOrderDrinks);
// router.delete('/:name', deleteDish);

export default router;
