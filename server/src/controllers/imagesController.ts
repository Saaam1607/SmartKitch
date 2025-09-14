import { Request, Response } from 'express';
import * as imagesService from '../services/imagesService';

export const uploadImage = async (req: Request, res: Response) => {
  try {

    const { image, name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = await imagesService.uploadImage(image, name);
    return res.status(200).json(imageUrl);

  } catch (error: any) {
    console.error('Error updating image:', error.message || error);

    if (error.message && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
};