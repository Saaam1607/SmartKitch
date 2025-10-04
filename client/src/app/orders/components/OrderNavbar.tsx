import React, { useState, useEffect } from 'react';

import type { User } from '@models/User';

import { usersService } from '../../services/usersService';

import Navbar from 'react-bootstrap/Navbar';
import { Form } from "react-bootstrap";

import { Search, Send } from 'lucide-react';

interface OrderNavbarProps {
  menuSections: string[];
  menuSectionSelected: string,
  setMenuSectionSelected: (section: string) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void,
};

export default function OrderNavbar({
  menuSections,
  menuSectionSelected,
  setMenuSectionSelected,
  searchTerm,
  setSearchTerm,
}: OrderNavbarProps) {

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

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="d-flex flex-column gap-2 p-3 w-100">

      <div className="w-100 d-flex gap-2 justify-content-center align-items-center">
        
        {/* <div>
          {user && (
            <img
              className='rounded-pill'
              src={user.imageUrl}
              style={{
                width: '50px',
                height: '50px',
              }}
            />
          )}
        </div> */}
        
        <div
          className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
          style={{
            width: "100%",
            maxWidth: '600px',
            borderRadius: '10px',
            height: '50px',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={20} className="text-muted" color="rgb(89, 92, 94)" strokeWidth={1}/>
          <Form.Control
            placeholder="Search..."
            className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        
        {/* <button
          className="d-flex justify-content-center align-items-center"
          style={{
            color: 'white',
            backgroundColor: 'rgb(220, 24, 44)',
            border: 'none',
            height: '50px',
            width: '50px',
            borderRadius: '15px',
          }}
        >
          <Send size={30} color='white' className="" />
        </button> */}
      </div>

      <Navbar
        data-bs-theme="light"
        className="d-flex align-items-center justify-content-center gap-3 p-0 m-0 px-3"
        style={{
          backgroundColor: 'transparent',
        }}
      > 
        {menuSections.map((section: string) => (
          <button
            className="btn btn-secondary p-3"
            style={{
              borderRadius: '15px',
              backgroundColor: section === menuSectionSelected ? 'rgb(220, 24, 44)' : 'rgba(240, 240, 240, 1)',
              color: 'black',
              border: 'none',
              boxShadow: 'rgba(76, 76, 76, 0.2) 0px 3px 5px',
            }}
            key={section}
          >
            <h2
              className="p-0 m-0"
              style={{
                fontSize: '1.1rem',
                color: section === menuSectionSelected ? 'white' : 'rgb(76, 76, 76)',
              }}
              onClick={() => setMenuSectionSelected(section === menuSectionSelected ? "" : section)}
            >
              {section}
            </h2>
          </button>
        ))}
      </Navbar>
    </div>
  );
}