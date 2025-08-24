import { CrudService } from "../types/CrudService";

import { User } from "@my-org/shared";

const API_URL = 'http://localhost:5001/user';


export const usersService: CrudService<User> = {
  
  async register(newUser: User): Promise<User> {
    const res = await fetch(API_URL + "/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
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

export default usersService;