'use client';

import useStore from '../../state/useStore'

import React, { useEffect, useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import Item from 'react-bootstrap/Item';

import { ChefHat } from 'lucide-react';
import { Pizza } from 'lucide-react';
import { HandPlatter } from 'lucide-react';
import { Utensils } from 'lucide-react';

import { toast } from 'sonner';

import IngredientsRegistry from './IngredientsRegistry'
import DishesRegistry from './DishesRegistry'

export default function Registries() {

  const { isEditing, setIsEditing } = useStore();
  const { componentKey, setComponentKey } = useStore();

  const [selectedRegistry, setSelectedRegistry] = useState('dishes');

  const handleSelect = (eventKey) => {
    if (!isEditing) {
      setComponentKey("");
      setSelectedRegistry(eventKey);
    } else {
      toast.warning("Finish editing before changing section");
    }
  }

  const isActive = (path: string) => {
    return selectedRegistry === path ? 'active' : '';
  };

  return (
    <div style={{ height: '100%' }} className="d-flex flex-column">
      <Navbar bg="dark" data-bs-theme="dark" className="p-0" >
        <Container>
          <Nav onSelect={handleSelect} className="m-auto menu-button">
            <Nav.Item>
              <Nav.Link eventKey="ingredients" className={isActive('ingredients')}>
                <div className="d-flex align-items-center">
                  <ChefHat />
                  <p>Ingredients</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dishes" className={isActive('dishes')}>
                <div className="d-flex align-items-center">
                  <Pizza />
                  <p>Dishes</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="courses" className={isActive('courses')}>
                <div className="d-flex align-items-center">
                  <HandPlatter />
                  <p>Courses</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu" className={isActive('menu')}>
                <div className="d-flex align-items-center">
                  <Utensils />
                  <p>Menu</p>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ flexGrow: 1, overflow: 'hidden' }}>
        {selectedRegistry === 'ingredients' && <IngredientsRegistry />}
        {selectedRegistry === 'dishes' && <DishesRegistry />}
      </div>
    </div>
  );
}
