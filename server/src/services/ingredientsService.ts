import pool from '../config/database';
import { imagekit, uploadImage } from '../config/imagekit';

import sharp from "sharp";

import { Ingredient } from '../models/Ingredient';

export const getItems = async (): Promise<Ingredient[]> => {
  const result = await pool.query('SELECT name, description, image_url AS "imageUrl", out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice" FROM ingredients');
  
  return result.rows;
};

export const createItem = async (newIngredient: Ingredient): Promise<Ingredient> => {
  
  const base64Data = newIngredient.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const uploadResponse = await uploadImage({
    file: buffer,
    fileName: `${newIngredient.name.replace(/\s+/g, "_")}.jpg`
  });

  const imageUrl = uploadResponse.url;

  const result = await pool.query(`
    INSERT INTO ingredients (name, description, image_url, out_of_stock, disabled, is_addable, addition_price)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING name, description, image_url AS "imageUrl", out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice"
  `, [
      newIngredient.name,
      newIngredient.description,
      imageUrl,
      newIngredient.outOfStock,
      newIngredient.disabled,
      newIngredient.isAddable,
      newIngredient.additionPrice
    ]
  );
  return result.rows[0];
};

export const editItem = async (newIngredient: Ingredient): Promise<Ingredient> => {
  const result = await pool.query(`
    UPDATE ingredients
    SET description = $2,
        out_of_stock = $3,
        disabled = $4,
        is_addable = $5,
        addition_price = $6
    WHERE name = $1
    RETURNING name, description, out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice"
  `, [
      newIngredient.name,
      newIngredient.description,
      newIngredient.outOfStock,
      newIngredient.disabled,
      newIngredient.isAddable,
      newIngredient.additionPrice
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Item with name "${newIngredient.name}" not found.`);
  }

  return result.rows[0];
};

export const editItemImage = async (name: string, newImage: string): Promise<Ingredient> => {
  const base64Data = newImage.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    UPDATE ingredients
    SET image = $2
    WHERE name = $1
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice"
  `, [
    name,
    buffer,
  ]);

  if (result.rowCount === 0) {
    throw new Error(`Item with name "${name}" not found.`);
  }

  return result.rows[0];
};

export const deleteItem = async (name: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM ingredients
    WHERE name = $1
  `, [name]);

  if (result.rowCount) {
    return result.rowCount > 0;
  } else {
    return false;
  }

};