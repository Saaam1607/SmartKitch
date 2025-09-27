import { Router } from 'express';
import { getUsers, getUser, editUser, deleteUser, registerUser, logUser } from '../controllers/usersController';

const router = Router();

router.get('/', getUsers);
router.get('/:token', getUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', logUser);

export default router;
