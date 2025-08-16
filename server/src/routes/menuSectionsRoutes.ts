import { Router } from 'express';
import { getMenuSections, createSection, editSection } from '../controllers/menuSectionsController';

const router = Router();

router.get('/', getMenuSections);
router.post('/', createSection);
router.put('/:name', editSection);
// router.delete('/:name', deleteDish);

export default router;
