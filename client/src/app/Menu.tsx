'use client';

import useStore from './state/useStore'

import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { Users, LibraryBig, NotebookPen, ChartNoAxesCombined } from 'lucide-react';
import { ChefHat, Pizza, Utensils, Wine } from 'lucide-react';

import { toast } from 'sonner';

import { useThemeStyles } from './hooks/useThemeStyles';

import { AnimatePresence, motion } from "framer-motion";


interface MenuProps {
  handleSelect: (eventKey: string | null) => null;
}


export default function Menu({
  handleSelect,
} : MenuProps) {

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  const { setComponentKey } = useStore();
  const [selectedRegistry, setSelectedRegistry] = useState('dishes');


  function isActive() {
    return;
  }

  return (
    <Navbar
      style={{
        backgroundColor: toolbarBg,
      }}
      className="d-flex align-items-start p-0 py-2"
    >
      <Container
        className="d-flex flex-column"
      >
        <div
          className="d-flex gap-2 align-items-center p-2"
          style={{
            width: '100%',
          }}
        >
          <Users color={toolbarTextColor} />
          <p
            className="m-0 p-0"
            style={{
              color: toolbarTextColor,
            }}
          >
            Team
          </p>
        </div>
        <div
          className="d-flex gap-2 align-items-center p-2"
          style={{
            width: '100%',
          }}
        >
          <LibraryBig color={toolbarTextColor} />
          <p
            className="m-0 p-0"
            style={{
              color: toolbarTextColor,
            }}
          >
            Registries
          </p>
        </div>
        <Nav onSelect={handleSelect} className="d-flex flex-column justify-content-start menu-button ms-3">
          <Nav.Item className="d-flex">
            <Nav.Link eventKey="ingredients" className={isActive('ingredients')}>
              <div className="d-flex align-items-center">
                <ChefHat color={toolbarTextColor} />
                <p style={{ color: toolbarTextColor }}>Ingredients</p>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex">
            <Nav.Link eventKey="dishes" className={isActive('dishes')}>
              <div className="d-flex align-items-center">
                <Pizza color={toolbarTextColor} />
                <p style={{ color: toolbarTextColor }}>Dishes</p>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex">
            <Nav.Link eventKey="drinks" className={isActive('drinks')}>
              <div className="d-flex align-items-center">
                <Wine color={toolbarTextColor} />
                <p style={{ color: toolbarTextColor }}>Drinks</p>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex">
            <Nav.Link eventKey="menu" className={isActive('menu')}>
              <div className="d-flex align-items-center">
                <Utensils color={toolbarTextColor} />
                <p style={{ color: toolbarTextColor }}>Menu</p>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div
          className="d-flex gap-2 align-items-center p-2"
          style={{
            width: '100%',
          }}
        >
          <NotebookPen color={toolbarTextColor} />
          <p
            className="m-0 p-0"
            style={{
              color: toolbarTextColor,
            }}
          >
            Orders
          </p>
        </div>
        <div
          className="d-flex gap-2 align-items-center p-2"
          style={{
            width: '100%',
          }}
        >
          <ChartNoAxesCombined color={toolbarTextColor} />
          <p
            className="m-0 p-0"
            style={{
              color: toolbarTextColor,
            }}
          >
            Statistics
          </p>
        </div>
      </Container>
    </Navbar>
  );
}
