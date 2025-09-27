import React, { useState, useEffect } from 'react';

import type { User } from '@models/User';

import { usersService } from '../../services/usersService';

interface ProfileProps {
  example: number;
}

export default function Profile({
  example,
}: ProfileProps) {

  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token)
      setToken(token);
    else
      alert("Token not found")
  }, [])

  useEffect(() => {
    if (!token) return;

    if (usersService.fetchItem) {
      usersService.fetchItem(token)
      .then((fetchedUser: User) => { setUser(fetchedUser) })
    }
  }, [token])

  return (
    <div
      className='d-flex pt-5 flex-column'
      style={{
        // height: '100%'
      }}
    >
      {user && (
        <div
          className='d-flex flex-column gap-4 align-items-center p-4'
          style={{
            backgroundColor: 'rgba(246, 218, 218, 1)',
            borderRadius: '25px',

          }}
        >
          <img
            className='rounded-pill'
            src={user.imageUrl}
            style={{
              width: '200px',
              height: '200px',
            }}
          />
          <div className='d-flex flex-column align-items-center'>
            <h2>
              {user.name} {user.surname}
            </h2>
            <h3>
              {user.email}
            </h3>
            <h4>
              {user.role}
            </h4>
          </div>
          
          <button
            className='btn btn-danger w-100'
            style={{
            }}
          >
            Logout
          </button>
          
        </div>


      )}


    </div>
  );
}