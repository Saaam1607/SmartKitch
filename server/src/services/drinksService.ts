import pool from '../config/database';

import { Drink } from '../models/Drink';

export const getItems = async (): Promise<Drink[]> => {
  const result = await pool.query('SELECT name, description, image_url AS "imageUrl", out_of_stock AS "outOfStock", disabled, price FROM drinks');
  return result.rows;
};

export const createItem = async (newItem: Drink): Promise<Drink> => {
  const result = await pool.query(`
    INSERT INTO drinks (name, description, image_url, out_of_stock, disabled, price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING name, description, image_url AS "imageUrl", out_of_stock AS "outOfStock", disabled, price
  `, [
      newItem.name,
      newItem.description,
      newItem.imageUrl,
      newItem.outOfStock,
      newItem.disabled,
      newItem.price
    ]
  );
  return result.rows[0];
};

export const editItem = async (newItem: Drink): Promise<Drink> => {
  const result = await pool.query(`
    UPDATE drinks
    SET description = $2,
        image_url = $3,
        out_of_stock = $4,
        disabled = $5,
        price = $6
    WHERE name = $1
    RETURNING name, description, image_url AS "imageUrl", out_of_stock AS "outOfStock", disabled, price
  `, [
      newItem.name,
      newItem.description,
      newItem.imageUrl,
      newItem.outOfStock,
      newItem.disabled,
      newItem.price
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Item with name "${newItem.name}" not found.`);
  }

  return result.rows[0];
};

export const deleteItem = async (name: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM drinks
    WHERE name = $1
  `, [name]);
  
  if (result.rowCount) {
    return result.rowCount > 0;
  } else {
    return false;
  }
};