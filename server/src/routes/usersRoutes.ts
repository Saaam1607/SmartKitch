import { Router } from 'express';
import { getUsers, editUser, deleteUser, registerUser, logUser } from '../controllers/usersController';

const router = Router();

router.get('/', getUsers);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', logUser);

export default router;
