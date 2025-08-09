import IngredientProp from '../types/IngredientProp'

const API_URL = 'http://localhost:5000/ingredients';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function blobUrlToBlob(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
}

export async function fetchIngredients(): Promise<IngredientProp[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  return res.json();
}

export async function addIngredient(newIngredient: Ingredient): Promise<IngredientProp> {
  const base64Image = await blobToBase64(newIngredient.image);
  newIngredient = { ...newIngredient, image: base64Image };
  
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient),
  });

  if (!res.ok) throw new Error('Failed to add ingredient');
  return res.json();
}

export async function editIngredient(newIngredient: Ingredient): Promise<IngredientProp> {

  let imageBase64: string = '';

  if (newIngredient.image instanceof Blob) {
    imageBase64 = await blobToBase64(newIngredient.image);
  } else if (typeof newIngredient.image === 'string') {
    if (newIngredient.image.startsWith('data:image')) {
      imageBase64 = newIngredient.image;
    } else if (newIngredient.image.startsWith('blob:')) {
      const blob = await blobUrlToBlob(newIngredient.image);
      imageBase64 = await blobToBase64(blob);
    }
  }

  const ingredientToSend = { ...newIngredient, image: imageBase64 };

  const res = await fetch(`${API_URL}/${encodeURIComponent(newIngredient.name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredientToSend),
  });

  if (!res.ok) throw new Error('Failed to edit ingredient');
  return res.json();
}

export async function deleteIngredient(name: string): Promise<void> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Failed to delete ingredient');
  return;
}
