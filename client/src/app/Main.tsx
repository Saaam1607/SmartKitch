"use client";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import Registries from './pages/registries/Registries';
import { CircleUserRound, Settings } from 'lucide-react';

import Logo from '../assets/images/logo.png';

import { LoadingProvider, useLoading } from './loadingProvider/LoadingProvider';
import Spinner from './LoadingProvider/Spinner';


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
  return (
    <div style={{ height: '100vh' }} className="d-flex flex-column">
      
      <div>
        <Navbar bg="dark" data-bs-theme="dark" className="p-0" >
          <Container fluid>
            <NavbarBrand>
              <h4 className="logo">SmartKitch</h4>
            </NavbarBrand>
            <Nav className="ms-auto">
              <Link href="/settings">
                <div className="nav-link d-flex align-items-center">
                  <Settings size={25} />
                </div>
              </Link>
              <Link href="/profile">
                <div className="nav-link d-flex align-items-center">
                  <CircleUserRound size={25} />
                </div>
              </Link>
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
