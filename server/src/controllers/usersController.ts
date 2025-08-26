import { Request, Response } from 'express';
import * as usersService from '../services/usersService';

import { User } from '../models/User';

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