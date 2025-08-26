import pool from '../config/database';

import { Dish } from '../models/Dish';

export const getItems = async (): Promise<Dish[]> => {
  const result = await pool.query(`
    SELECT
      d.name,
      d.description,
      d.image,
      d.out_of_stock AS "outOfStock", 
      d.disabled,
      d.price,
      COALESCE(array_agg(DISTINCT di.ingredient_name) FILTER (WHERE di.ingredient_name IS NOT NULL), '{}') AS ingredients
    FROM dishes d
    LEFT JOIN dish_ingredients di ON di.dish_name = d.name
    GROUP BY d.name, d.description, d.image, d.out_of_stock, d.disabled, d.price
  `);

  const items = result.rows.map(row => {
    const base64Image = row.image.toString('base64');
    const mimeType = 'image/jpeg';
    return {
      ...row,
      image: `data:${mimeType};base64,${base64Image}`,
      ingredients: row.ingredients || []
    };
  });

  return items;
};

export const createItem = async (newItem: Dish): Promise<Dish> => {

  let buffer: Buffer | undefined;

  if (newItem?.image) {
    const base64Data = newItem.image.replace(/^data:image\/\w+;base64,/, "");
    buffer = Buffer.from(base64Data, 'base64');
  }

  try {
    await pool.query('BEGIN');

    await pool.query(`
      INSERT INTO dishes (name, description, image, out_of_stock, disabled, price)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      newItem.name,
      newItem.description,
      buffer,
      newItem.outOfStock,
      newItem.disabled,
      newItem.price,
    ]);

    if (newItem.ingredients && newItem.ingredients.length > 0) {
      const insertIngredientsQuery = `
        INSERT INTO dish_ingredients (dish_name, ingredient_name)
        VALUES ${newItem.ingredients.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      `;
      await pool.query(insertIngredientsQuery, [newItem.name, ...newItem.ingredients]);
    }

    await pool.query('COMMIT');

    if (buffer) {
      return {
        ...newItem,
        image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
      };
    } else {
      return {
        ...newItem
      };
    }

  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

export const editItem = async (newItem: Dish): Promise<Dish> => {
  const base64Data = newItem.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    await pool.query('BEGIN');

    const result = await pool.query(`
      UPDATE dishes
      SET description = $2,
          image = $3,
          out_of_stock = $4,
          disabled = $5,
          price = $6
      WHERE name = $1
      RETURNING name, description, image, out_of_stock AS "outOfStock", disabled, price
    `, [
      newItem.name,
      newItem.description,
      buffer,
      newItem.outOfStock,
      newItem.disabled,
      newItem.price
    ]);

    if (result.rowCount === 0) {
      await pool.query('ROLLBACK');
      throw new Error(`Item with name "${newItem.name}" not found.`);
    }
    await pool.query(`
      DELETE FROM dish_ingredients
      WHERE dish_name = $1
    `, [newItem.name]);

    if (newItem.ingredients && newItem.ingredients.length > 0) {
      const insertIngredientsQuery = `
        INSERT INTO dish_ingredients (dish_name, ingredient_name)
        VALUES ${newItem.ingredients.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      `;
      await pool.query(insertIngredientsQuery, [newItem.name, ...newItem.ingredients]);
    }

    await pool.query('COMMIT');

    return {
      ...newItem,
      image: `data:image/jpeg;base64,${buffer.toString('base64')}`
    };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};


export const deleteItem = async (name: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM dishes
    WHERE name = $1
  `, [name]);
  
  if (result.rowCount) {
    return result.rowCount > 0;
  } else {
    return false;
  }
};