"use client";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import Registries from './pages/registries/Registries';
import { CircleUserRound, Settings } from 'lucide-react';

import Logo from '../assets/images/logo.png';

import { LoadingProvider, useLoading } from './loadingProvider/LoadingProvider';
import { ThemeProvider } from "./themes/ThemeProvider";
import Spinner from './LoadingProvider/Spinner';

import { useThemeStyles } from "./hooks/useThemeStyles";


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

  const { bgColor, textColor, toolbarBg } = useThemeStyles();

  return (
    <div style={{ height: '100vh' }} className="d-flex flex-column">
      
      <div>
        <Navbar
          className="p-0" 
          style={{
            backgroundColor: toolbarBg,
            color: "white",
          }}
        >
          <Container fluid>
            <NavbarBrand>
              <h4 className="logo" style={{ color: "white" }}>SmartKitch</h4>
            </NavbarBrand>
            <Nav className="ms-auto">
              <Link href="/settings">
                <div className="nav-link d-flex align-items-center">
                  <Settings size={25} color="lightgrey" />
                </div>
              </Link>
              <Link href="/profile">
                <div className="nav-link d-flex align-items-center">
                  <CircleUserRound size={25} color="lightgrey" />
                </div>
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div className="d-flex flex-column" style={{ flexGrow: 1, overflow: 'hidden' }}>
        <LoadingProvider>
          <ThemeProvider>
            <RegistriesContent />
          </ThemeProvider>
        </LoadingProvider>
      </div>
    </div>
  );
}
