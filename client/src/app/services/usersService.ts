import CrudService from "../types/CrudService";
import UserService from "../types/UserService";

import { User } from '@models/User';

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001") + '/users';

const usersAuthService: UserService = {

  async register(email: string, password: string, name: string, surname: string): Promise<User> {
    const res = await fetch(API_URL + "/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, surname }),
    });
    
    if (!res.ok) throw new Error('Failed to register user');
    
    return res.json();
  },

  async login(email: string, password: string): Promise<string> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await res.json();
    const token = data.token;

    localStorage.setItem('authToken', token);

    return token;
  },

};

const usersService: CrudService<User> = {
  
  async fetchItems(): Promise<User[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async fetchItem(token: string): Promise<User> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(token)}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async addItem(newUser: User): Promise<User> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error('Failed to add user');
    return res.json();
  },

  async editItem(newUser: User): Promise<User> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(newUser.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error('Failed to edit user');
    return res.json();
  },

  async deleteItem(componentKey: string): Promise<void> {
    const res = await fetch(`${API_URL}/${encodeURIComponent(componentKey)}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete user');
    return;
  },
};

export {usersAuthService, usersService};