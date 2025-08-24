"use client";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import Registries from './pages/registries/Registries';
import { CircleUserRound, Settings, Palette } from 'lucide-react';

import Logo from '../assets/images/logo.png';

import { LoadingProvider, useLoading } from './loadingProvider/LoadingProvider';
import Spinner from './LoadingProvider/Spinner';

import UserDropDown from './components/generic/dropdown/UserDropDown';
import ThemeDropDown from './components/generic/dropdown/ThemeDropDown';

import { useThemeStyles } from "./hooks/useThemeStyles";
import { useTheme } from "./themes/ThemeProvider";


import './styles/fonts.css';
import './styles/logo.css';
import './styles/menu-button.css';

import Link from 'next/link';

function RegistriesContent() {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Spinner />}
      <Registries />
    </>
  );
}

export default function Main() {

  const {setThemeName } = useTheme();

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  function setTheme(theme: string) {
    setThemeName(theme);
  };


  return (
    <div 
      className="d-flex flex-column"
      style={{  
        height: '100vh',
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
          <Container fluid>
            <NavbarBrand>
              <h4 className="logo" style={{ color: toolbarTextColor }}>SmartKitch</h4>
            </NavbarBrand>

            <Nav className="ms-auto">
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

      <div className="d-flex flex-column" style={{ flexGrow: 1, overflow: 'hidden' }}>
        <LoadingProvider>
          <RegistriesContent />
        </LoadingProvider>
      </div>
    </div>
  );
}
