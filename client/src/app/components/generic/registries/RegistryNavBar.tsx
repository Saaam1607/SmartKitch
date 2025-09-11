import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';

import { Search } from 'lucide-react';


import Form from 'react-bootstrap/Form';
import IconButton from '../button/IconButton';

import { useThemeStyles } from '../../../hooks/useThemeStyles';

import useStore from '../../../state/useStore'

type RegistryNavBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showFilters?: boolean;
  setShowFilters?: (value: boolean) => void;
  renderCreationModal: (visible: boolean, close: () => void) => React.ReactNode;
};

export default function RegistryNavBar({ searchTerm, setSearchTerm, showFilters, setShowFilters, renderCreationModal }: RegistryNavBarProps) {

  const [showCreationModal, setShowCreationModal] = useState(false);

  const { componentKey } = useStore();

  const {
    newColor,
  } = useThemeStyles();

  function handleFiltersClick() {
    if (setShowFilters)
      setShowFilters(!showFilters)
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleCreationModalClick() {
    setShowCreationModal(true);
  }

  function creationModalClose() {
    setShowCreationModal(false);
  }

  return (
    <>
      {renderCreationModal(showCreationModal, creationModalClose)}

      <Navbar
        bg="transparent"
        data-bs-theme="light"
        className="d-flex align-items-center justify-content-between p-0"
        style={{
          opacity: componentKey ? 0.5 : 1,
          pointerEvents: componentKey ? "none" : "auto"
        }}
      > 
        <div
          className="d-flex align-items-center gap-2 me-2"
          style={{ width: '100%' }}
        >
          <IconButton
            iconName="SlidersHorizontal" 
            color="grey"
            outline={false}
            title="Filters"
            onClick={handleFiltersClick}
          />
          
          <div
            className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
            style={{
              width: "100%",
              maxWidth: '600px',
              borderRadius: '10px'
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

          <div
            className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
            style={{
              width: "100%",
              maxWidth: '200px',
              borderRadius: '10px'
            }}
          >
            <Form.Select
              className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"

            >
              <option>Alphabetical Asc</option>
              <option>Alphabetical Desc</option>
            </Form.Select>
          </div>

        </div>
          
        <IconButton
          iconName="Plus"
          color={newColor}
          outline={false}
          title='New Item'
          onClick={handleCreationModalClick}
        />

      </Navbar>
    </>
  );
}