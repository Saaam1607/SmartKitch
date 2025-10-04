import pool from '../config/database';

import { Order } from '../models/Order';
import { Dish } from '../models/Dish';

export async function getDish(dishName: string): Promise<Dish | null> {
  const result = await pool.query(`
    SELECT
      d.name,
      d.description,
      d.image_url AS "imageUrl",
      d.out_of_stock AS "outOfStock", 
      d.disabled,
      d.price,
      COALESCE(
        array_agg(DISTINCT di.ingredient_name) 
        FILTER (WHERE di.ingredient_name IS NOT NULL), 
        '{}'
      ) AS ingredients
    FROM dishes d
    LEFT JOIN dish_ingredients di ON di.dish_name = d.name
    WHERE d.name = $1
    GROUP BY d.name, d.description, d.image_url, d.out_of_stock, d.disabled, d.price
  `, [dishName]);

  return result.rows[0] || null;
}