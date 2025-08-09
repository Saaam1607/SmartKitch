import pool from '../config/database';

import Ingredient from '../types/IngredientType';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const result = await pool.query('SELECT name, description, image, out_of_stock AS "outOfStock", disabled FROM ingredients');
  const ingredients = result.rows.map(row => {
    const base64Image = row.image.toString('base64');
    const mimeType = 'image/jpeg';
    return {
      ...row,
      image: `data:${mimeType};base64,${base64Image}`
    };
  });

  return ingredients;
};

export const createIngredient = async (newIngredient: Ingredient): Promise<Ingredient> => {
  
  const base64Data = newIngredient.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    INSERT INTO ingredients (name, description, image, out_of_stock, disabled)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled
  `, [
      newIngredient.name,
      newIngredient.description,
      buffer,
      newIngredient.outOfStock,
      newIngredient.disabled
    ]
  );
  return result.rows[0];
};

export const editIngredient = async (newIngredient: Ingredient): Promise<Ingredient> => {
  const base64Data = newIngredient.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    UPDATE ingredients
    SET description = $2,
        image = $3,
        out_of_stock = $4,
        disabled = $5
    WHERE name = $1
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled
  `, [
      newIngredient.name,
      newIngredient.description,
      buffer,
      newIngredient.outOfStock,
      newIngredient.disabled
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Ingredient with name "${newIngredient.name}" not found.`);
  }

  return result.rows[0];
};


export const deleteIngredient = async (name: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM ingredients
    WHERE name = $1
  `, [name]);
  return result.rowCount > 0;
};