import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import { motion } from "motion/react"

import { Search } from 'lucide-react';

import Form from 'react-bootstrap/Form';
import IconButton from '../button/IconButton';

type RegistryNavBarProps = {
  handleFiltersClick: () => void;
  searchTerm: string;
  setSearchTerm: () => void;
  startEditing: () => void;
  saveItemChanges: () => void;
  undoItemChanges: () => void;
  handleCreationModalClick: () => void;
  selectedItem: boolean;
  isEditing: boolean;
  filters: React.ReactNode;
  children: React.ReactNode;
};

export default function RegistryNavBar({
  handleFiltersClick,
  searchTerm,
  setSearchTerm,
  startEditing,
  saveItemChanges,
  undoItemChanges,
  handleCreationModalClick,
  selectedItem,
  isEditing,
  filters,
  children
 }: RegistryNavBarProps) {

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
    <Navbar bg="transparent" data-bs-theme="light" className="d-flex justify-content-center p-0" > 
      <Container fluid className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
        <div className="d-flex align-items-center">
          
          <IconButton variant="secondary" iconName="SlidersHorizontal" onClick={handleFiltersClick} />
          
          <Form className="d-flex p-1" style={{ width: '100%', maxWidth: '400px' }}>
            <div
              className="d-flex align-items-center bg-white border rounded-pill px-3 shadow-sm"
              style={{ width: "100%" }}
            >
              <Search size={20} className="text-muted me-1" />
              <Form.Control
                type="search"
                placeholder="Search..."
                className="border-0 shadow-none flex-grow-1"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </Form>
        </div>
          
        <motion.div
          className="d-flex align-items-center gap-1"
          layout
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20
          }}
        >
          {selectedItem ? (
            !isEditing ? (
              <motion.div
                key="view"
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="d-flex gap-1">
                  <IconButton variant="warning" iconName="Pencil" onClick={startEditing} />
                  <IconButton variant="danger" iconName="Trash" onClick={() => {}} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="d-flex gap-1">
                  <IconButton variant="success" iconName="Save" onClick={saveItemChanges} />
                  <IconButton variant="secondary" iconName="RotateCcw" onClick={undoItemChanges} />
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              key="add"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <IconButton variant="primary" iconName="Plus" onClick={handleCreationModalClick} />
            </motion.div>
          )}
        </motion.div>

      </Container>
    </Navbar>
    
    <>{filters}</>

    </>
  );
}