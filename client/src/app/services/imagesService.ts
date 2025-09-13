import CrudService from "../types/CrudService";

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/image';

interface ImagesServiceInterface {
  fetchItems: () => Promise<T[]>;
  addItem: (item: T) => Promise<T>;
  editItem: (item: T) => Promise<T>;
  uploadImage: (image: string) => Promise<void>;
}

export const imagesService: ImagesServiceInterface = {
  
  async uploadImage(image: string): Promise<string> {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: image }),
    });

    if (!res.ok) throw new Error('Failed to edit ingredient');
    return res.json();
  },

};

export default imagesService;