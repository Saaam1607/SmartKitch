import pool from '../config/database';

import { Order } from '../models/Order';
import { Dish } from '../models/Dish';
import { Drink } from '../models/Drink';

import { getDish } from '../functions/dishesFunctions'
import { getDrink } from '../functions/drinksFunctions'

async function getOrders() {
  const ordersResult = await pool.query(`
    SELECT *
    FROM orders o
  `);

  return ordersResult.rows;
}

async function getDishesBodiesByOrder(orderId: number) {
  const result = await pool.query(`
    SELECT
      odb.id,
      odb.order_id,
      odb.section_name,
      odb.line
    FROM orders_dishes_bodies odb
    WHERE odb.order_id = $1
  `, [orderId]);
  return result.rows;
}

async function getDrinksBodiesByOrder(orderId: number) {
  const result = await pool.query(`
    SELECT
      odb.id,
      odb.order_id,
      odb.section_name,
      odb.line
    FROM orders_drinks_bodies odb
    WHERE odb.order_id = $1
  `, [orderId]);
  return result.rows;
}

async function getOrderedDishesByBody(dishesBodyId: number) {
  const result = await pool.query(`
    SELECT
      od.dishes_body_id,
      od.dish_name,
      od.quantity
    FROM order_dishes od
    WHERE od.dishes_body_id = $1
  `, [dishesBodyId]);
  return result.rows;
}

async function getOrderedDrinksByBody(drinksBodyId: number) {
  const result = await pool.query(`
    SELECT
      od.drinks_body_id,
      od.drink_name,
      od.quantity
    FROM order_drinks od
    WHERE od.drinks_body_id = $1
  `, [drinksBodyId]);
  return result.rows;
}

export async function getItems(): Promise<Order[]> {
  const orders = await getOrders();
  const items: Order[] = [];

  for (const order of orders) {

    let item: Order = order;
    item.dishes_body = [];
    item.drinks_body = [];

    const dishesBodies = await getDishesBodiesByOrder(order.id);
    const drinksBodies = await getDrinksBodiesByOrder(order.id);

    for (const dishesBody of dishesBodies) {
      const bodySection = {
        section_name: dishesBody.section_name,
        ordered_dishes: [] as { dish: Dish; quantity: number }[],
      };

      const orderedDishes = await getOrderedDishesByBody(dishesBody.id);

      for (const ordered of orderedDishes) {
        const dishDetails = await getDish(ordered.dish_name);
        if (dishDetails) {
          bodySection.ordered_dishes.push({
            dish: dishDetails,
            quantity: ordered.quantity,
          });
        }
      }

      item.dishes_body.push(bodySection);
    }

    for (const drinksBody of drinksBodies) {
      const bodySection = {
        section_name: drinksBody.section_name,
        ordered_drinks: [] as { drink: Drink; quantity: number }[],
      };

      const orderedDishes = await getOrderedDrinksByBody(drinksBody.id);

      for (const ordered of orderedDishes) {
        const drinkDetails = await getDrink(ordered.drink_name);
        if (drinkDetails) {
          bodySection.ordered_drinks.push({
            drink: drinkDetails,
            quantity: ordered.quantity,
          });
        }
      }

      item.drinks_body.push(bodySection);
    }

    items.push(item);
  }

  return items;
}

export const createItem = async (item: Order): Promise<Order> => {
  try {
    await pool.query('BEGIN');

    const orderResult = await pool.query(
      `
      INSERT INTO orders (table_number, waiter, taken_at, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [item.table_number, item.waiter, item.taken_at, item.notes]
    );

    const orderId = orderResult.rows[0].id;

    for (const dishesBody of item.dishes_body) {
      const dishesBodyResult = await pool.query(
        `
        INSERT INTO orders_dishes_bodies (order_id, section_name, line)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [orderId, dishesBody.section_name, 0]
      );

      const dishesBodyId = dishesBodyResult.rows[0].id;

      for (const orderedDish of dishesBody.ordered_dishes) {
        await pool.query(
          `
          INSERT INTO order_dishes (dishes_body_id, dish_name, quantity)
          VALUES ($1, $2, $3)
          `,
          [dishesBodyId, orderedDish.dish.name, orderedDish.quantity]
        );
      }
    }

    for (const drinksBody of item.drinks_body ?? []) {
      const drinksBodyResult = await pool.query(
        `
        INSERT INTO orders_drinks_bodies (order_id, section_name, line)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [orderId, drinksBody.section_name, 0]
      );

      const drinksBodyId = drinksBodyResult.rows[0].id;

      for (const orderedDrink of drinksBody.ordered_drinks) {
        await pool.query(
          `
          INSERT INTO order_drinks (drinks_body_id, drink_name, quantity)
          VALUES ($1, $2, $3)
          `,
          [drinksBodyId, orderedDrink.drink.name, orderedDrink.quantity]
        );
      }
    }

    await pool.query('COMMIT');

    return {
      ...item,
      id: orderId,
    };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

export const serveDishes = async (id: number, value: boolean): Promise<Order> => {
  const result = await pool.query(`
    UPDATE orders
    SET are_dishes_served = $2
    WHERE id = $1
    RETURNING *
  `, [
      id,
      value
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Item with not found.`);
  }

  return result.rows[0];
}

export const serveDrinks = async (id: number, value: boolean): Promise<Order> => {
  const result = await pool.query(`
    UPDATE orders
    SET are_drinks_served = $2
    WHERE id = $1
    RETURNING *
  `, [
      id,
      value
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Item with not found.`);
  }

  return result.rows[0];
}



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