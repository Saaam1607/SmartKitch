import pool from '../config/database';

import Drink from '../types/DrinkType';

export const getDrinks = async (): Promise<Drink[]> => {
  const result = await pool.query('SELECT name, description, image, out_of_stock AS "outOfStock", disabled, price FROM drinks');
  const items = result.rows.map(row => {
    const base64Image = row.image.toString('base64');
    const mimeType = 'image/jpeg';
    return {
      ...row,
      image: `data:${mimeType};base64,${base64Image}`
    };
  });

  return items;
};

export const createDrink = async (newItem: Drink): Promise<Drink> => {
  const base64Data = newItem.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    INSERT INTO drinks (name, description, image, out_of_stock, disabled, price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING name, description, image, out_of_stock AS "outOfStock", disabled, price
  `, [
      newItem.name,
      newItem.description,
      buffer,
      newItem.outOfStock,
      newItem.disabled,
      newItem.price
    ]
  );
  return result.rows[0];
};

export const editDrink = async (newItem: Drink): Promise<Drink> => {
  const base64Data = newItem.image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const result = await pool.query(`
    UPDATE drinks
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
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Drink with name "${newItem.name}" not found.`);
  }

  return result.rows[0];
};


export const deleteDrink = async (name: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM drinks
    WHERE name = $1
  `, [name]);
  return result.rowCount > 0;
};