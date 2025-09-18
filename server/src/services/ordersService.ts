import pool from '../config/database';

import { Order } from '../models/Order';

export const getItems = async (): Promise<Order[]> => {
  const result = await pool.query(`
    SELECT
      o.id,
      o.table_number,
      o.waiter,
      o.taken_at,
      o.notes,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'dish_name', di.dish_name,
            'quantity', di.quantity
          )
        ) FILTER (WHERE di.dish_name IS NOT NULL),
        '[]'
      ) AS ordered_dishes,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'drink_name', dr.drink_name,
            'quantity', dr.quantity
          )
        ) FILTER (WHERE dr.drink_name IS NOT NULL),
        '[]'
      ) AS ordered_drinks
    FROM orders o
    LEFT JOIN order_dishes di ON di.order_id = o.id
    LEFT JOIN order_drinks dr ON dr.order_id = o.id
    GROUP BY o.id
  `);

  const items = result.rows;

  return items;
};

// export const createItem = async (item: Order): Promise<Order> => {
//   try {
//     await pool.query('BEGIN');

//     await pool.query(`
//       INSERT INTO menu_sections (name, description, disabled)
//       VALUES ($1, $2, $3)
//     `, [
//       item.name,
//       item.description,
//       item.disabled,
//     ]);

//     if (item.dishes && item.dishes.length > 0) {
//       const insertIngredientsQuery = `
//         INSERT INTO menu_section_dishes (menu_section_name, dish_name)
//         VALUES ${item.dishes.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
//       `;
//       await pool.query(insertIngredientsQuery, [item.name, ...item.dishes]);
//     }

//     await pool.query('COMMIT');

//     return {
//       ...item,
//     };
//   } catch (err) {
//     await pool.query('ROLLBACK');
//     throw err;
//   }
// };

// export const editItem = async (newItem: Order): Promise<Order> => {
  
//   try {
//     await pool.query('BEGIN');

//     const result = await pool.query(`
//       UPDATE menu_sections
//       SET
//         description = $2,
//         disabled = $3
//       WHERE name = $1
//       RETURNING name, description, disabled
//     `, [
//       newItem.name,
//       newItem.description,
//       newItem.disabled,
//     ]);

//     if (result.rowCount === 0) {
//       await pool.query('ROLLBACK');
//       throw new Error(`Item with name "${newItem.name}" not found.`);
//     }
//     await pool.query(`
//       DELETE FROM menu_section_dishes
//       WHERE menu_section_name = $1
//     `, [newItem.name]);

//     if (newItem.dishes && newItem.dishes.length > 0) {
//       const insertDishesQuery = `
//         INSERT INTO menu_section_dishes (menu_section_name, dish_name)
//         VALUES ${newItem.dishes.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
//       `;
//       await pool.query(insertDishesQuery, [newItem.name, ...newItem.dishes]);
//     }

//     await pool.query('COMMIT');

//     return { ...newItem };
//   } catch (err) {
//     await pool.query('ROLLBACK');
//     throw err;
//   }
// };