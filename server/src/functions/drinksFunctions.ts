import pool from '../config/database';

import { Order } from '../models/Order';
import { Drink } from '../models/Drink';

export async function getDrink(drinkName: string): Promise<Drink | null> {
  
  const result = await pool.query(`
    SELECT
      name,
      description,
      image_url AS "imageUrl",
      out_of_stock AS "outOfStock",
      disabled,
      price
    FROM drinks
    WHERE name = $1
  `, [drinkName]);

  return result.rows[0] || null;
}