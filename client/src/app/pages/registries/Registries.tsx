'use client';

import useStore from '../../state/useStore'

import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { ChefHat, Pizza, Utensils, Wine } from 'lucide-react';

import { toast } from 'sonner';

import { useThemeStyles } from '../../hooks/useThemeStyles';

import IngredientsRegistry from './IngredientsRegistry'
import DrinksRegistry from './DrinksRegistry'
import DishesRegistry from './DishesRegistry'
import MenuSectionsRegistry from './MenuSectionsRegistry'

export default function Registries() {

  const { isEditing } = useStore();
  const { setComponentKey } = useStore();

  const [selectedRegistry, setSelectedRegistry] = useState('dishes');

  const { cardsContainerBg, toolbarBg } = useThemeStyles();


  const handleSelect = (eventKey: string | null) => {
    if (!isEditing) {
      setComponentKey("");
      if (eventKey) {
        setSelectedRegistry(eventKey);
      }
    } else {
      toast.warning("Finish editing before changing section");
    }
  }

  const isActive = (path: string) => {
    return selectedRegistry === path ? 'active' : '';
  };

  return (
    <div style={{ height: '100%' }} className="d-flex flex-column">
      <Navbar
        style={{
          backgroundColor: toolbarBg,
        }}
        className="p-0"
      >
        <Container>
          <Nav onSelect={handleSelect} className="m-auto menu-button">
            <Nav.Item>
              <Nav.Link eventKey="ingredients" className={isActive('ingredients')}>
                <div className="d-flex align-items-center">
                  <ChefHat color="lightgrey" />
                  <p style={{ color: "lightgrey" }}>Ingredients</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dishes" className={isActive('dishes')}>
                <div className="d-flex align-items-center">
                  <Pizza color="lightgrey" />
                  <p style={{ color: "lightgrey" }}>Dishes</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="drinks" className={isActive('drinks')}>
                <div className="d-flex align-items-center">
                  <Wine color="lightgrey" />
                  <p style={{ color: "lightgrey" }}>Drinks</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu" className={isActive('menu')}>
                <div className="d-flex align-items-center">
                  <Utensils color="lightgrey" />
                  <p style={{ color: "lightgrey" }}>Menu</p>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <div
        className="p-3"
        style={{
          flexGrow: 1,
          overflow: 'hidden',
          // backgroundColor: 'rgba(207, 207, 210, 1)',
        }}
      >
        {selectedRegistry === 'ingredients' && <IngredientsRegistry />}
        {selectedRegistry === 'dishes' && <DishesRegistry />}
        {selectedRegistry === 'drinks' && <DrinksRegistry />}
        {selectedRegistry === 'menu' && <MenuSectionsRegistry />}
      </div>
    </div>
  );
}
