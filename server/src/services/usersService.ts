import pool from '../config/database';

import { User } from '../models/User';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export const getItems = async (): Promise<User[]> => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.surname,
      u.email,
      u.role,
      u.image_url AS "imageUrl",
      u.created_at AS "createdAt",
      u.updated_at AS "updatedAt"
    FROM users u
  `);

  const items = result.rows;

  return items;
};

export const getItem = async (id: string): Promise<User> => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.surname,
      u.email,
      u.role,
      u.image_url AS "imageUrl",
      u.created_at AS "createdAt",
      u.updated_at AS "updatedAt"
    FROM users u
    WHERE u.id = $1
  `, [
    id
  ]);

  const item = result.rows[0] ?? null;
  return item;
};

export const editItem = async (newItem: User): Promise<User> => {
  const result = await pool.query(`
    UPDATE users
    SET name = $2,
        surname = $3,
        email = $4,
        role = $5,
        image_url = $6,
        updated_at = $7
    WHERE id = $1
    RETURNING id, name, surname, email, role, image_url AS "imageUrl", updated_at AS "updatedAt"
  `, [
      newItem.id,   
      newItem.name,
      newItem.surname,
      newItem.email,
      newItem.role,
      newItem.imageUrl,
      new Date(),
    ]
  );

  if (result.rowCount === 0) {
    throw new Error(`Item with name "${newItem.name}" not found.`);
  }

  return result.rows[0];
};

export const deleteItem = async (id: string): Promise<boolean> => {
  const result = await pool.query(`
    DELETE FROM users
    WHERE id = $1
  `, [id]);

  if (result.rowCount) {
    return result.rowCount > 0;
  } else {
    return false;
  }
};

export const register = async (email: string, password: string, name: string, surname: string): Promise<User> => {

  const hashedPassword = await hashPassword(password);

  const result = await pool.query(`
    INSERT INTO users (email, password_hash, name, surname)
    VALUES ($1, $2, $3, $4)
    RETURNING email, name, surname
  `, [
      email,
      hashedPassword,
      name,
      surname,
    ]
  );
  return result.rows[0];
};

export async function login(email: string, password: string): Promise<string> {
  const result = await pool.query(
    `SELECT id, password_hash FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    const error = new Error('Authentication failed');
    (error as any).status = 401;
    throw error;
  }

  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    const error = new Error('Authentication failed');
    (error as any).status = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  return token;
}