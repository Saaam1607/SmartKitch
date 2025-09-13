import pool from '../config/database';
import { imagekit, uploadImage } from '../config/imagekit';

import sharp from "sharp";

export const uploadImage = async (image: string): Promise<string> => {
  
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const uploadResponse = await uploadImage({
    file: buffer,
    fileName: `${name.replace(/\s+/g, "_")}.jpg`
  });

  const imageUrl = uploadResponse.url;

  return imageUrl;
};