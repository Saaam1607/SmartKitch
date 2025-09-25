"use client";

import React, { useState, useEffect } from 'react';

import useStore from './state/useStore'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import Registries from './components/generic/registries/Registries';
import { CircleUserRound, Settings, Palette } from 'lucide-react';

import UserDropDown from './components/generic/dropdown/UserDropDown';
import ThemeDropDown from './components/generic/dropdown/ThemeDropDown';

import Menu from "./components/generic/menu/Menu";

import { useThemeStyles } from "./hooks/useThemeStyles";

import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";

import { toast } from 'sonner';

import './styles/fonts.css';
import './styles/logo.css';


import Link from 'next/link';

export default function Main() {

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  const { componentKey } = useStore();

  const [selectedRegistry, setSelectedRegistry] = useState('roles');

  const handleSelect = (eventKey: string | null) => {
    if (componentKey) {
      toast.warning("Finish editing the item before changing page");
      return;
    }

    if (eventKey) {
      setSelectedRegistry(eventKey);
      localStorage.setItem('selectedRegistry', eventKey);
    }
  }

  useEffect(() => {
    const _selectedRegistry = localStorage.getItem('selectedRegistry');
    if (_selectedRegistry !== null) {
      setSelectedRegistry(_selectedRegistry);
    }
  }, [])

  return (
    <div 
      className="d-flex flex-column"
      style={{  
        height: '100dvh',
        backgroundColor: bgColor,
        color: textColor,
      }}
    >      
      <div>
        <Navbar
          className="p-0" 
          style={{
            backgroundColor: toolbarBg,
            color: toolbarTextColor,
          }}
        >
          <Container fluid className="d-flex">
            
            <div className="flew-grow-1 w-100" />
            
            <NavbarBrand className="d-flex align-items-center gap-2">
              <Image
                src="/assets/logo/SKlightgrey.png"
                alt="SmartKitch Logo"
                width={20}
                height={20}
              />
              <h4 className="logo" style={{ color: toolbarTextColor }}>SmartKitch</h4>
            </NavbarBrand>

            <Nav className="d-flex justify-content-end ms-auto flex-grow-1 w-100">
              <div className="nav-link d-flex align-items-center">
                <ThemeDropDown iconComponent={<Palette size={25} color={toolbarTextColor} />} />
              </div>
              <Link href="/settings">
                <div className="nav-link d-flex align-items-center">
                  <Settings size={25} color={toolbarTextColor} />
                </div>
              </Link>
              <div className="nav-link d-flex align-items-center">
                <UserDropDown iconComponent={<CircleUserRound size={25} color={toolbarTextColor} />} />
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div
        className="d-flex flex-row"
        style={{
          width: '100%',
          flexGrow: 1,
          overflow: 'hidden'
        }}
      >
        <div >
          <Menu selectedRegistry={selectedRegistry} handleSelect={handleSelect} />
        </div>

        <div
          className="flex-grow-1"
          style={{ height: '100%' }}
        >
          <Registries selectedRegistry={selectedRegistry} />
        </div>
      </div>
    </div>
  );
}
