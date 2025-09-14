const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/image';

interface ImagesServiceInterface {
  uploadImage: (image: string, name: string) => Promise<string>
}

export const imagesService: ImagesServiceInterface = {
  
  async uploadImage(image: string, name: string): Promise<string> {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: image,
        name: name
      }),
    });

    if (!res.ok) throw new Error('Failed to edit ingredient');
    return res.json();
  },

};

export default imagesService;