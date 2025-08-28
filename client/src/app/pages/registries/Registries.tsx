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

import { AnimatePresence, motion } from "framer-motion";

import RegistryContainer from './RegistryContainer';


interface RegistriesProps {
  selectedRegistry: string;
}

export default function Registries({
  selectedRegistry,
} : RegistriesProps) {

  const { cardsContainerBg, toolbarBg, toolbarTextColor } = useThemeStyles();

  const isActive = (path: string) => {
    return selectedRegistry === path ? 'active' : '';
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
      className="d-flex flex-column"
    >
      {/* <Navbar
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
                  <ChefHat color={toolbarTextColor} />
                  <p style={{ color: toolbarTextColor }}>Ingredients</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dishes" className={isActive('dishes')}>
                <div className="d-flex align-items-center">
                  <Pizza color={toolbarTextColor} />
                  <p style={{ color: toolbarTextColor }}>Dishes</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="drinks" className={isActive('drinks')}>
                <div className="d-flex align-items-center">
                  <Wine color={toolbarTextColor} />
                  <p style={{ color: toolbarTextColor }}>Drinks</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu" className={isActive('menu')}>
                <div className="d-flex align-items-center">
                  <Utensils color={toolbarTextColor} />
                  <p style={{ color: toolbarTextColor }}>Menu</p>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar> */}
      <div
        className="p-3"
        style={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <RegistryContainer
            key='ingredients'
            showRegistry={selectedRegistry === 'ingredients'}
            registryComponent={<IngredientsRegistry />}
          />
          <RegistryContainer
            key='dishes'
            showRegistry={selectedRegistry === 'dishes'}
            registryComponent={<DishesRegistry />}
          />
          <RegistryContainer
            key='drinks'
            showRegistry={selectedRegistry === 'drinks'}
            registryComponent={<DrinksRegistry />}
          />
          <RegistryContainer
            key='menu'
            showRegistry={selectedRegistry === 'menu'}
            registryComponent={<MenuSectionsRegistry />}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
