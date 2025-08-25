import pool from '../config/database';

import { Ingredient } from "@my-org/shared";

export const getItems = async (): Promise<Ingredient[]> => {
  const result = await pool.query('SELECT name, description, out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice" FROM ingredients');
  const ingredients = result.rows.map(row => {
    // const base64Image = row.image.toString('base64');
    // const mimeType = 'image/jpeg';
    return {
      ...row,
      // image: `data:${mimeType};base64,${base64Image}`
    };
  });

  return ingredients;
};

export const createItem = async (newIngredient: Ingredient): Promise<Ingredient> => {
  
  const base64Data = newIngredient.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    INSERT INTO ingredients (name, description, image, out_of_stock, disabled, isAddable, additionPrice)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice"
  `, [
      newIngredient.name,
      newIngredient.description,
      buffer,
      newIngredient.outOfStock,
      newIngredient.disabled,
      newIngredient.isAddable,
      newIngredient.additionPrice
    ]
  );
  return result.rows[0];
};

export const editItem = async (newIngredient: Ingredient): Promise<Ingredient> => {
  const base64Data = newIngredient.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    UPDATE ingredients
    SET description = $2,
        image = $3,
        out_of_stock = $4,
        disabled = $5,
        is_addable = $6,
        addition_price = $7
    WHERE name = $1
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled, is_addable AS "isAddable", addition_price AS "additionPrice"
  `, [
      newIngredient.name,
      newIngredient.description,
      buffer,
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