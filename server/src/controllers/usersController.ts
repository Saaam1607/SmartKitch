import { Request, Response } from 'express';
import * as usersService from '../services/usersService';

import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getItems();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    if (!newUser.id) {
      return res.status(400).json({ message: 'User id is required' });
    }

    const updatedUser = await usersService.editItem(newUser);
    return res.status(200).json(updatedUser);

  } catch (error: any) {
    console.error('Error updating user:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Id is required to delete an user' });
    }

    const isDeleted = await usersService.deleteItem(id);
    if (isDeleted) {
      return res.status(200).json({ message: `User '${id}' deleted successfully.` });
    } else {
      return res.status(404).json({ message: `User '${id}' not found.` });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  
  // todo checks:
  // - duplicate email

  try {

    const { email, password, name, surname } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await usersService.register(email, password, name, surname);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during user registration' });
  }
};

export const logUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message || 'Login failed' });
  }
}