import ImageKit from "imagekit";
import dotenv from "dotenv";

import sharp from "sharp";

dotenv.config();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export interface UploadImageOptions {
  file: string | Buffer;
  fileName: string;
}

export async function uploadImage({ file, fileName }: UploadImageOptions) {
  try {

    file = await sharp(file)
      .resize(400, 200, { fit: 'inside' })  
      .jpeg({ quality: 25 }) 
      .toBuffer();

    const response = await imagekit.upload({
      file,           
      fileName,       
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}