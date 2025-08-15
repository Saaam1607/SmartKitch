import { Request, Response } from 'express';
import * as menuSectionsService from '../services/menuSectionsService';

import { MenuSection } from "@my-org/shared";

export const getMenuSections = async (req: Request, res: Response) => {
  try {
    const items = await menuSectionsService.getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};