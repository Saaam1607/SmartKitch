import pool from '../config/database';

import { MenuSection } from "@my-org/shared";

export const getItems = async (): Promise<MenuSection[]> => {
const result = await pool.query(`
    SELECT d.name, d.description, d.disabled,
           COALESCE(array_agg(di.dish_name),'{}') AS ingredients
    FROM menu_sections d
    LEFT JOIN menu_section_dishes di ON di.menu_section_name = d.name
    GROUP BY d.name, d.description, d.disabled
  `);

  const items = result.rows;

  return items;
};