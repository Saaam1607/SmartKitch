export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function blobUrlToBlob(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
}