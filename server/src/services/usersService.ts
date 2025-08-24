import pool from '../config/database';

import { User } from "@my-org/shared";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export const register = async (newUser: User): Promise<User> => {

  const hashedPassword = await hashPassword(newUser.password);

  const result = await pool.query(`
    INSERT INTO users (email, password_hash, name, surname)
    VALUES ($1, $2, $3, $4)
    RETURNING email, name, surname
  `, [
      newUser.email,
      hashedPassword,
      newUser.name,
      newUser.surname,
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