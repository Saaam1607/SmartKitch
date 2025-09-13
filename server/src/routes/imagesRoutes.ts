import { Router } from 'express';
import { uploadImage } from '../controllers/imagesController';

const router = Router();

router.post('/', uploadImage);

export default router;