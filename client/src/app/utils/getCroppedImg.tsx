function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

export default async function getCroppedImg(imageSrc: string, crop: null | { x: number; y: number; width: number; height: number }) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = crop?.width || 0;
  canvas.height = crop?.height || 0;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.drawImage(
    image,
    crop?.x || 0,
    crop?.y || 0,
    crop?.width || 0,
    crop?.height || 0,
    0,
    0,
    crop?.width || 0,
    crop?.height || 0
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}