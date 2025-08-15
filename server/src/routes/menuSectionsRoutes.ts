import { Router } from 'express';
import { getMenuSections } from '../controllers/menuSectionsController';

const router = Router();

router.get('/', getMenuSections);
// router.post('/', createDish);
// router.put('/:name', editDish);
// router.delete('/:name', deleteDish);

export default router;
