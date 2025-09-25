import pool from '../config/database';

import { MenuSection } from '../models/MenuSection';

export const getItems = async (): Promise<MenuSection[]> => {
  const result = await pool.query(`
    SELECT
      d.name,
      d.description,
      d.disabled,
      COALESCE(array_agg(DISTINCT di.dish_name) FILTER (WHERE di.dish_name IS NOT NULL), '{}') AS dishes
    FROM menu_sections d
    LEFT JOIN menu_section_dishes di ON di.menu_section_name = d.name
    GROUP BY d.name, d.description, d.disabled
  `);

  const items = result.rows;

  return items;
};

export const createItem = async (item: MenuSection): Promise<MenuSection> => {
  try {
    await pool.query('BEGIN');

    await pool.query(`
      INSERT INTO menu_sections (name, description, disabled)
      VALUES ($1, $2, $3)
    `, [
      item.name,
      item.description,
      item.disabled,
    ]);

    if (item.dishes && item.dishes.length > 0) {
      const insertIngredientsQuery = `
        INSERT INTO menu_section_dishes (menu_section_name, dish_name)
        VALUES ${item.dishes.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      `;
      await pool.query(insertIngredientsQuery, [item.name, ...item.dishes]);
    }

    await pool.query('COMMIT');

    return {
      ...item,
    };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

export const editItem = async (newItem: MenuSection): Promise<MenuSection> => {
  
  try {
    await pool.query('BEGIN');

    const result = await pool.query(`
      UPDATE menu_sections
      SET
        description = $2,
        disabled = $3
      WHERE name = $1
      RETURNING name, description, disabled
    `, [
      newItem.name,
      newItem.description,
      newItem.disabled,
    ]);

    if (result.rowCount === 0) {
      await pool.query('ROLLBACK');
      throw new Error(`Item with name "${newItem.name}" not found.`);
    }
    await pool.query(`
      DELETE FROM menu_section_dishes
      WHERE menu_section_name = $1
    `, [newItem.name]);

    if (newItem.dishes && newItem.dishes.length > 0) {
      const insertDishesQuery = `
        INSERT INTO menu_section_dishes (menu_section_name, dish_name)
        VALUES ${newItem.dishes.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      `;
      await pool.query(insertDishesQuery, [newItem.name, ...newItem.dishes]);
    }

    await pool.query('COMMIT');

    return { ...newItem };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};